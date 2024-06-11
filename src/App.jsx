import { useEffect, useState } from 'react'

import './App.css'

const skillList = [{name: "Immortal Dash", cost: 0, img: '', description: ""},
  {name: "Qi Blast", cost: 0, img: '', description: ""},
  {name: "Triple Slash", cost: 0, img: '', description: ""},
  {name: "Parry", cost: 0, img: '', description: ""},

  {name: "Air Dash", cost: 0, img: '', description: ""},
  {name: "Cloud Leap", cost: 0, img: '', description: ""},
  {name: "Swift Runner", cost: 1, img: '', description: ""},
  {name: "Qi Boost", cost: 1, img: '', description: ""},
  {name: "Shadow Strike", cost: 1, img: '', description: ""},
  {name: "Tai Chi Kick", cost: 0, img: '', description: ""},
  {name: "Bullet Deflect", cost: 1, img: '', description: ""},

  {name: "Unbounded Counter", cost: 0, img: '', description: ""},
  {name: "Swift Rise", cost: 1, img: '', description: ""},
  {name: "Life Recovery", cost: 1, img: '', description: ""},
  {name: "Charged Strike", cost: 0, img: '', description: ""},
  {name: "Qi Boost", cost: 2, img: '', description: ""},
  {name: "Backlash", cost: 2, img: '', description: ""},
  {name: "Skull Kick", cost: 2, img: '', description: ""},
  {name: "Breathing Exercise", cost: 2, img: '', description: ""},

  {name: "Leverage", cost: 2, img: '', description: ""},
  {name: "Water Flow", cost: 2, img: '', description: ""},
  {name: "Full Control", cost: 2, img: '', description: ""},

  {name: "Enhanced Blade", cost: 2, img: '', description: ""},
  {name: "Enhanced Talisman", cost: 2, img: '', description: ""},
  {name: "Azure Recovery", cost: 2, img: '', description: ""},
  {name: "Enhanced Talisman", cost: 2, img: '', description: ""},
  {name: "Incisive Drain", cost: 2, img: '', description: ""},
  {name: "Enhanced Bullet Deflect", cost: 2, img: '', description: ""},

  {name: "Unbounded Drain", cost: 2, img: '', description: ""},
  {name: "Qi Boost", cost: 2, img: '', description: ""},
  {name: "Qi Boost", cost: 2, img: '', description: ""},
  {name: "Enhanced Blade", cost: 2, img: '', description: ""},

  {name: "Unbounded Charge", cost: 3, img: '', description: ""},
  {name: "Enhanced Water Flow", cost: 3, img: '', description: ""},
  {name: "Enhanced Full Control", cost: 3, img: '', description: ""},
  {name: "Enhanced Qi Blast", cost: 3, img: '', description: ""},
];
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
  useEffect(() => {initStarters(); updateSkillCount();},[buttons]);

  return (
    <>
      <div>
        <h2>
          Total Skill Count: <span>{skillCount}</span>
        </h2>
        <div className='skillgrid'>
          {skillList.map((x, id) => (          
            <Skill key={id + '' + x.name} skillCounter={() => addCount(id)} imgSrc={'test'} skillName={x.name} id={id + '' + x.name}></Skill>))
          }
        </div>
      </div>
    </>
  )
}

function Skill({skillCounter, imgSrc, skillName, id}) {

  return (
    <>
      <button className='skillbutton' onClick={skillCounter} id={id}>
        <p>{skillName}</p>
      </button>
      {/* <img src={imgSrc}>Test</img> */}

    </>
  )
}

export default App
