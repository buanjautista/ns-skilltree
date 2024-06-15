import { useEffect, useState } from 'react'

import './App.css'

const skillList = [{name: "Immortal Dash", cost: 0, img: '', description: "Press [DASH] while moving on the ground to dash forward and evade enemy attacks. Also effective for evading Crimson Attacks and lasers."},
  {name: "Qi Blast", cost: 0, img: '', description: "Hold down [Talisman] to generate an explosion by charging a talisman with up to three Qi charges. All talisman charges inflict internal damage upon impact. Talisman explosions convert all internal damage into direct damage."},
  {name: "Triple Slash", cost: 0, img: '', description: "Press [Attack] repeatedly to materialize your internal energy into a blade and unleash a three-hit combo. Use with caution as Yi will be momentarily vulnerable after the combo has been initated."},
  {name: "Parry", cost: 0, img: '', description: "Press [Parry] to deflect enemy attacks and convert them into Qi charges. Imprecise parries will result in some internal (recoverable) damage taken. Certain moves like crimson and fire attacks cannot be parried."},

  {name: "Air Dash", cost: 0, img: '', description: "Press [Dash] in midair to dodge enemy attacks and avoid taking damage. This is an essential skill to master for aerial combat."},
  {name: "Cloud Leap", cost: 0, img: '', description: "Muster energy from the elements and press [Jump] to jump once more in midair. Expands Yi's exploration range and allows him to fly over enemies and reach previously inaccessible heights."},
  {name: "Swift Runner", cost: 1, img: '', description: "Hold down [Dash] while moving to greatly increase movement speed on flat ground. Shortens travel times along familiar paths."},
  {name: "Qi Boost", cost: 1, img: '', description: "Increases maximum Qi charge capacity through advanced Qi training methods."},
  {name: "Shadow Strike", cost: 1, img: '', description: "Inflicts increased damage when striking an enemy from behind with a strong attack. Strong attacks include any Azure Bow attack, the final strike of the Triple Slash, and Talisman Explosions"},
  {name: "Tai Chi Kick", cost: 0, img: '', description: "Press [Parry] in midair to bounce off New Kunlun's green energy orbs to gain access to higher areas or explore new paths. If a green glow is present on an enemy using a Crimson Attack, Yi can use Tai-Chi Kick to inflict Internal Damage to them."},
  {name: "Bullet Deflect", cost: 1, img: '', description: "Deflects certain projectiles like arrows or bullets back at the enemy with a precise parry. Useful against ranged enemies."},

  {name: "Unbounded Counter", cost: 0, img: '', description: "Hold [Parry] to charge and release [Parry] at the right moment to deflect any attack (including Crimson Attacks) and inflict Internal Damage."},
  {name: "Swift Rise", cost: 1, img: '', description: "When knocked down, press [Dash] to quickly dash and get Yi back up on his feet. Speeds up recovery and allows Yi to swiftly engage with an enemy's follow-up attack."},
  {name: "Life Recovery", cost: 1, img: '', description: "Recover some health after pickup up experience dropped after death."},
  {name: "Charged Strike", cost: 0, img: '', description: "Hold [Attack] to charge. Yi will glow green once it has fully charged. Release the attack button after charging to unleash a powerful forward thrust which can destroy enemy shields and hard obstacles."},
  {name: "Qi Boost", cost: 2, img: '', description: "Increases maximum Qi charge capacity through advanced Qi training methods."},
  {name: "Backlash", cost: 2, img: '', description: "Increases the Internal Damage inflicted by a successful Tai-Chi Kick or Skull Kick"},
  {name: "Skull Kick", cost: 2, img: '', description: "White in the air, hold down [Down] and [Attack] to perform a special kick which will bounce you up in the air for a bit if successfully landed. Skull Kick can be used as an alternative to the Tai-Chi Kick."},
  {name: "Breathing Exercise", cost: 2, img: '', description: "Take a breather to recover Internal Damage after a precise parry."},

  {name: "Leverage", cost: 2, img: '', description: "Increases Internal Damage inflicted by Unbounded Counter."},
  {name: "Water Flow", cost: 2, img: '', description: "Talisman will automatically detonate after a short delay, lowering the risk of being attacked during talisman detonation. Attaching a talisman consumes two Qi charges. Talisman explosions convert all Internal Damage into direct damage."},
  {name: "Full Control", cost: 2, img: '', description: "Hold down [Talisman] and release it to control the length of Talisman detonation time. It will determine Qi charge usage and explosion damage. Talisman explosions convert all Internal Damage into direct damage."},

  {name: "Enhanced Blade", cost: 2, img: '', description: "Increases damage inflicted by all slash attacks, including the Triple Slash and the Charged Strike."},
  {name: "Enhanced Talisman", cost: 2, img: '', description: "Increases Talisman explosion damage."},
  {name: "Azure Recovery", cost: 2, img: '', description: "Gain some Azure Sand after picking up experience dropped after death."},
  {name: "Enhanced Talisman", cost: 2, img: '', description: "Increases Talisman explosion damage."},
  {name: "Incisive Drain", cost: 2, img: '', description: "Gain one additional Qi charge after successfully performing a Tai-Chi Kick or Skull Kick."},
  {name: "Enhanced Bullet Deflect", cost: 2, img: '', description: "Increases damage inflicted by Bullet Deflect."},

  {name: "Unbounded Drain", cost: 2, img: '', description: "Gain one additional Qi charge after successfully performing an Unbounded Counter."},
  {name: "Qi Boost", cost: 2, img: '', description: "Increases maximum Qi charge capacity through advanced Qi training methods."},
  {name: "Qi Boost", cost: 2, img: '', description: "Increases maximum Qi charge capacity through advanced Qi training methods."},
  {name: "Enhanced Blade", cost: 2, img: '', description: "Increases damage inflicted by all slash attacks, including the Triple Slash and the Charged Strike."},

  {name: "Unbounded Charge", cost: 3, img: '', description: "Generates a Qi charge when charging the Unbounded Counter. This charge will dissipate after a short while."},
  {name: "Enhanced Water Flow", cost: 3, img: '', description: "Expend one less Qi charge when using Water Flow."},
  {name: "Enhanced Full Control", cost: 3, img: '', description: "Use Full Control to detonate a five-charge Qi Blast and cause massive damage."},
  {name: "Enhanced Qi Blast", cost: 3, img: '', description: "Obtain one Azure sand after detonating a three-charge Qi Blast."},
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
  const currentCostBox = document.getElementById('currentCostBox');
  const currentNameBox = document.getElementById('currentNameBox');
  const currentDescBox = document.getElementById('currentDescBox');

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
