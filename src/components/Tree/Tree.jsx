import { useEffect, useState } from "react";
import { skillList } from "./skilllist.js";
import { Skill } from '../Card/Card.jsx'
import { DmgCalc } from "../DmgCalc/DmgCalc.jsx";
import "./Tree.css";

export default function Tree() {
  const [buttons, setButtons] = useState(Array(skillList.length).fill(false));
  const [skillCount, setSkillCount] = useState(0);
  const [selected, setSelected] = useState(Array(0).fill(0));

  const addCount = (index) => {
    let currentButtons = [...buttons];
    currentButtons[index] = !currentButtons[index];
    let entry = index + "" + skillList[index].name;
    let currentEntry = document.getElementById(entry);
    if (skillList[index].cost != 0) {
      currentEntry.classList.toggle("active");
    }
    
    let selection = [...selected];
    if (currentButtons[index] && !selection.includes(index) && skillList[index].cost != 0){
      selection.push(index);
    }
    else { selection = selection.filter((item) => { return item != index; }); }

    setSelected(selection);
    setButtons(currentButtons);
  };

  const initStarters = () => {
    for (let i = 0; i < skillList.length; i++) {
      let currentEntry = document.getElementById(i + "" + skillList[i].name);
      if (
        skillList[i].cost == 0 &&
        !currentEntry.classList.contains("active")
      ) {
        currentEntry.classList.add("baseactive");
      }
    }
  };

  const updateSkillCount = () => {
    let value = 0;
    for (let i = 0; i < skillList.length; i++) {
      if (buttons[i] == true) {
        value += skillList[i].cost;
      }
    }
    setSkillCount(value);
  };

  const updateDescription = (skill) => {
    currentNameBox.innerText = skill.name;
    currentDescBox.innerText = skill.description;
    currentCostBox.innerText = skill.cost;
  };

  useEffect(() => {
    initStarters();
    updateSkillCount();
  }, [buttons]);


  const sendUpgrades = () => {
    let states = [...buttons]
    let upgrades = [Number(states[22]), Number(states[23]), Number(states[25]), Number(states[31])];
    
    return upgrades;
  }

  const resetStates = () => {
    setSelected(Array(0).fill(0));
    setSkillCount(0);
    setButtons(Array(skillList.length).fill(false));
    for(let element of document.getElementById('skillgrid').children) {
      element.classList.contains('active') && element.classList.remove('active');
    }
  }
  return (
    <>
      <div>
        <h2>
          Total Skill Cost: <span>{skillCount}</span>
        </h2>
        <button onClick={resetStates}>Reset Selection</button>
        <div className="skill-container">
          <img src="./images/skillbg.webp" className="skill-bg" />
          <div className="skillgrid" id="skillgrid">
            {skillList.map((x, id) => (
              <Skill
                key={id + "" + x.name}
                skillCounter={() => addCount(id)}
                skill={x}
                id={id}
                hover={updateDescription}
                selectionNumber={selected}
              />
            ))}
          </div>
        </div>
        <div className="currentSkillBox">
          <div className="flex justify-between">
            <h3 id="currentNameBox"></h3>
            <div>
              Cost: <span id="currentCostBox"></span>
            </div>
          </div>
          <div>
            <h4 id="currentDescBox"></h4>
          </div>
        </div>
        <DmgCalc upgrades={sendUpgrades()} />
      </div>
    </>
  );
}
