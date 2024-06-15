import { useEffect, useState } from 'react'

import './App.css'

import { skillList } from './skilllist.js';

function App() {
  const [buttons, setButtons] = useState(Array(skillList.length).fill(false));
  const [skillCount, setSkillCount] = useState(0);
  
  const addCount = (index) => {
    let currentButtons = [...buttons];
    currentButtons[index] = !currentButtons[index];
    let entry = index + '' + skillList[index].name;
    let currentEntry = document.getElementById(entry);
    if (skillList[index].cost != 0) {
      currentEntry.classList.toggle('active');
    }
    setButtons(currentButtons)
  }

  const initStarters = () => {
    for(let i = 0; i < skillList.length; i++) {
      let currentEntry = document.getElementById(i + '' + skillList[i].name);
      if (skillList[i].cost == 0 && !currentEntry.classList.contains('active')) {
        currentEntry.classList.add('baseactive');
      }
    }
  }

  const updateSkillCount = () => {
    let value = 0;
    for(let i = 0; i < skillList.length; i++) {
      if (buttons[i] == true) {
        console.log('test');
        value += skillList[i].cost;
      }
    }
    setSkillCount(value);
  }

  const updateDescription = (skill) => {
    currentNameBox.innerText = skill.name;
    currentDescBox.innerText = skill.description;
    currentCostBox.innerText = skill.cost;
  }
  useEffect(() => {initStarters(); updateSkillCount();},[buttons]);

  return (
    <>
      <div>
        <h2>
          Total Skill Count: <span>{skillCount}</span>
        </h2>
          <div className='skill-container'>
            <img src='./images/skillbg.webp' className='skill-bg'/>
            <div className='skillgrid'>
              {skillList.map((x, id) => (          
                <Skill key={id + '' + x.name} skillCounter={() => addCount(id)} skill={x} id={id} hover={updateDescription}></Skill>))
              }
            </div>
          </div>
          <div className="currentSkillBox">
            <div><h3 id='currentNameBox'></h3></div>
            <div><h4 id='currentDescBox'></h4></div>
            <div>Cost: <span id='currentCostBox'></span></div>
          </div>
        </div>
    </>
  )
}

function Skill({skillCounter, skill, id, hover}) {
  let skillName = skill.name

  let imgSrc = `./images/${skillName.toLowerCase()}.webp`
  let itemId= id + '' + skillName;

  const skillForm = () => {
    let list = [1,20,21,33,34,35]
    if (list.includes(id)) {
      return 'rhombus';
    }
    return 'circle';
  }

  return (
    <>
      <button className={`skillbutton ${skillForm()}`} onClick={skillCounter} id={itemId} onMouseOver={() => hover(skill)}>
          <img src={imgSrc} alt={skillName}/>
      </button>
        {/* <div className="hiddendesc">{skillName}</div> */}
    </>
  )
}

export default App
