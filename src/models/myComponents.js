import BaseClass from "../componentListNPM/baseClass";
// import auth from "../services/auth.js";
import moment from 'moment';
class componentBase extends BaseClass {
    constructor(opps) {
        super(opps);
        this.createUUID = this.createUUID.bind(this);

    }
    json;
    startobj = {
        date: "",
        _id: "",
        description: "",
        title: "",
        owner: "",
        user: "",
        type: "",

        collection: "",
    }

    userInfo = {
        about: "",
        picURL: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
        role: "",
        date: "",
        pics: "",

        collection: ""
    }
    createUUID(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789-#';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }





}



class UserThings extends componentBase {
    constructor(opps) {
        super(opps);

    }
    json = {
        ...this.userInfo,
        role: "teacher",
        type: "user",
        signUpDate: moment().format('L'),
        paidCustomer: false,
        _id: ""
    }



}



class Student extends componentBase {

    json = {

        type: "student",
        name: "",
        notes: "",
        email: "",
        phone: "",
        _id: ""

    }



}

class Card extends componentBase {
    json = {
        type: 'card',
        picURLs: undefined,
        name: "",
        _id: "",
        studentCard: false,
        routineIDs: {}


    }
    async getPicSrc(path) {
        let obj = {}
        for (const key in path) {
            let pic = ""//await auth.downloadPics(path[key]);
            obj["media" + this.createUUID(3)] = pic;
        }
        obj = { ...obj, ...this.json.picURLs }


        this.json.picURLs = obj

    }

}
class AssignedCard extends componentBase {
    json = {
        type: 'card',
        picURLs: undefined,
        name: "",
        _id: "",
        routineIDs: {}


    }
    async getPicSrc(path) {
        let obj = {}
        for (const key in path) {
            let pic = ""//await auth.downloadPics(path[key]);
            obj["media" + this.createUUID(3)] = pic;
        }
        obj = { ...obj, ...this.json.picURLs }


        this.json.picURLs = obj

    }

}
class Routine extends componentBase {
    json = {
        type: "routine",
        name: "",
        _id: "",
        order: {},
        picURL: ""
    }
    async getPicSrc(path) {


        let pic = ""//await auth.downloadPics(path);



        this.json.picURL = pic

    }
}

class AssignedRoutine extends componentBase {
    json = {
        type: "assignedRoutine",
        name: "",
        _id: "",
        studentID: "",
        order: {}
    }
}


class Tag extends componentBase {

    json = {

        type: "tag",
        name: "",
        _id: "",
        recipeID: ""

    }
}

class Encounter extends componentBase {


    json = {
        type: "encounter",
        name: "",
        description: "",
        audioLink: "",
        currentParticipant: "",
        _id: "",
        ruleset: "5e",
    }

    async addCampaignPlayers(playerList,) {

        let comps = playerList;
        let encPlayer = [];

        if (comps) {
            for (let obj of comps) {
                let monsterJson = await obj.copyComponent(["encounterId", "role",], [this.json._id, "",],);
                await this.operationsFactory.jsonPrepare({ "addparticipant": monsterJson });
                let p = await this.operationsFactory.getUpdater("add")[0];
                encPlayer.push(p);
                await this.operationsFactory.run();
            };
        }
        return encPlayer
    }

    getNextNextP(sortedParticipants, index) {
        let participant = undefined;
        for (let i = index + 2; i < sortedParticipants.length; i++) {
            if (sortedParticipants[i].getJson().rollState) {
                participant = sortedParticipants[i];
                break;
            }
        }
        return participant;
    }
    getNextP(sortedParticipants, firstTime, componentList) {
        //use the find method to find index of the currentParticipant id in the participant list
        let p = sortedParticipants.find((obj) => { return obj.getJson()._id === this.json.currentParticipant })
        let index = sortedParticipants.indexOf(p);
        let participant = sortedParticipants[index + 1];
        if (!participant.getJson().rollState) {

            participant = this.getNextNextP(sortedParticipants, index);

            if (!participant) {
                this.json.currentParticipant = "";
                if (!firstTime) {
                    this.getHighestParticipant(componentList);
                    return
                }

            }

        }
        return participant.getJson()._id
    }

    getHighestParticipant(componentList) {

        let participants = componentList.getList("participant", this.json._id, "encounterId")
        //use the .sort method to organize the participants by the highest initiative first
        let sortedParticipants = participants.sort((a, b) => {

            let initiativeA = parseInt(a.getJson().initiative);
            let initiativeB = parseInt(b.getJson().initiative);

            // Check if either initiative is not a number
            if (isNaN(initiativeA)) initiativeA = Number.MAX_SAFE_INTEGER; // Treat non-numeric values as maximum
            if (isNaN(initiativeB)) initiativeB = Number.MAX_SAFE_INTEGER;

            return initiativeB - initiativeA; // Sort descending
        })
        //let participant id = the list of participants first element
        let participantId = sortedParticipants[0].getJson()._id

        //if this.json.currentParticipant != ""
        if (this.json.currentParticipant !== "" && sortedParticipants[sortedParticipants.length - 1].getJson()._id !== this.json.currentParticipant) {

            participantId = this.getNextP(sortedParticipants, false, componentList)

        }
        if (!sortedParticipants.find(obj => obj.getJson()._id === participantId)?.getJson().rollState) {
            this.json.currentParticipant = participantId;
            participantId = this.getNextP(sortedParticipants, true, componentList);

        }


        if (sortedParticipants.find(obj => obj.getJson()._id === participantId)?.getJson().rollState) {
            //set json currentParticipant with the participant id var
            this.json.currentParticipant = participantId
            //this.operationsFactory.cleanPrepareRun(update: this) 
            this.operationsFactory.cleanPrepareRun({ update: this });
            let p = componentList.getComponent("participant", participantId, "_id");
            return p

        }



    }
    clearParticipant() {
        this.json.currentParticipant = ""
        this.operationsFactory.cleanPrepareRun({ update: this })
    }

}

class Participant extends componentBase {


    json = {
        type: "participant",
        name: "",
        initiative: "",
        armor: "",
        hitPoints: "",
        statBlockLink: "",
        note: "",
        encounterId: "",
        _id: "",
    }

    updateConditions(ruleset) {
        //get the list of conditions from the ruleset save in conditionList var
        let conditionList =ruleset.getJson().conditionList.split(',');
        //do Object.keys(this.json) save in a variable called jsonList
        let jsonList = Object.keys(this.json)
        //for everything in the ruleset conditionList:
        for (let condition of conditionList) {
            //if jsonList.includes(something from the ruleset) and its not undefined nor ""
            if (jsonList.includes(condition)) {
                if (this.json[condition] !== "" || this.json[condition] !== undefined) {
                    //increment the value on that condition
                    this.json[condition]++
                }



            }
        }
        
        //after the for loop update the participant.
        this.operationsFactory({ update: this })
    }
}

class Ruleset extends componentBase {
    json = {
        type: "ruleset",
        conditionList: "Blinded,Burning,Concentration,Charmed,Deafened,Exhaustion,Frightened,Grappled,Incapacitated,Invisible,Paralyzed,Petrified,Poisoned,Prone,Restrained,Stunned,Unconcious,Dead",
        name: "5e",


    }
}
function forFactory() {
    return { user: UserThings, tag: Tag, student: Student, card: Card, routine: Routine, assignedRoutine: AssignedRoutine, assignedCard: AssignedCard, encounter: Encounter, participant: Participant, ruleset: Ruleset }
}


export { forFactory }
