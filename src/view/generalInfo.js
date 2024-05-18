import { Component } from 'react';
import DetailsDisplay from "./detailsDisplay";
import EncounterForm from "./encounterForm";
import './../App.css';
import '../mapTech/themes/css/encManager.css';
import placeholder from '../pics/placeholderEncounter1.JPG';
import placeholder2 from '../pics/placeholderEncounter2.jpg';
import placeholder3 from '../pics/placeholderEncounter3.JPG';
import placeholder4 from '../pics/placeholderEncounter4.JPG';

export default class GeneralInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      placeholderImage: this.getRandomPlaceholder(),
    }

  }

  getRandomPlaceholder() {
    const placeholders = [placeholder, placeholder2, placeholder3, placeholder4];
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    return placeholders[randomIndex];
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let currentEncounter = app.state.currentEncounter;
    let obj = currentEncounter;
    let state = app.state;
    let styles = state.styles;
    let placeholderImage = this.state.placeholderImage;

    return (
      <div
        className='Background-Content'
        style={{
          backgroundImage: 'url(' + (currentEncounter?.getJson().picURL || placeholderImage) + ')',
        }}
      >
        <div className='Header-Enc'>
        
          <div className='Header-Row'>
            {this.state.edit === false && <div className='Header-Title'>{currentEncounter.getJson().name}</div>}
            <div className='Header-Buttons'>
              {this.state.edit === false && (
                <div
                  className='button Edit-Encounter-Button'
                  onClick={() => this.setState({ edit: true })}
                >
                  Edit Encounter
                </div>
              )}
              
            </div>
           
          </div>
          {this.state.edit === false && <DetailsDisplay app={app} />}

          {this.state.edit === true && (
            <div className='Header-Edit'>
              <div
                title='Close and Save'
                className='button Close-Button'
                onClick={() => this.setState({ edit: false })}
              >
                X
              </div>
              <div className='Encounter-Form-Container'>
                <EncounterForm app={app} />
              </div>
            </div>
          )}

          <div className='Footer-Row'>
            <div className='button Log-Initiative-Button'>Log Initiative</div>
            <div className='Footer-Buttons'>
              <div
                className='button Add-All-Players-Button'
                onClick={() =>
                  currentEncounter.addCampaignPlayers(
                    app.state.componentList.getList('participant', 'player', 'role')
                  )
                }
              >
                Add Players
              </div>
              <div
                className='button Add-New-Creature-Button'
                onClick={() =>
                  dispatch({
                    popUpSwitch: 'addMonster',
                    operate: 'addparticipant',
                    operation: 'cleanJsonPrepare',
                    object: { encounterId: currentEncounter.getJson()._id, type: 'participant' },
                  })
                }
              >
                Add a Creature
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}