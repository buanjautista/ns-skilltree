import { useEffect, useState } from "react";

const DMG_LIST = { "TALISMAN": 0, "TALISMAN_INT": 1, "SLASH": 2, "CHARGE": 3};
const BASE_DMG = [32,64,20,64];

export const DmgCalc = ({upgrades}) => {
  let [damages, setDamages] = useState(BASE_DMG);
  let [taoValue, setTaoValue] = useState(0);

  const changeDmgValues = (value) => {
    let talismanDmg = damages[0];
    let talismanInt = damages[1];
    let slashDmg = damages[2];
    let chargeDmg = damages[3];

    talismanDmg = BASE_DMG[DMG_LIST["TALISMAN"]] + (value * (BASE_DMG[DMG_LIST["TALISMAN"]]*0.03)) + (upgrades[1] * BASE_DMG[DMG_LIST["TALISMAN"]]*0.23) + (upgrades[2] * BASE_DMG[DMG_LIST["TALISMAN"]]*0.23);
    talismanInt = BASE_DMG[DMG_LIST["TALISMAN_INT"]];
    slashDmg = BASE_DMG[DMG_LIST["SLASH"]] + (value * (BASE_DMG[DMG_LIST["SLASH"]]*0.03)) + (upgrades[0] * BASE_DMG[DMG_LIST["SLASH"]]*0.23) + (upgrades[3] * BASE_DMG[DMG_LIST["SLASH"]]*0.23);
    chargeDmg = BASE_DMG[DMG_LIST["CHARGE"]] + (value * (BASE_DMG[DMG_LIST["CHARGE"]]*0.03)) + (upgrades[0] * BASE_DMG[DMG_LIST["CHARGE"]]*0.23) + (upgrades[3] * BASE_DMG[DMG_LIST["CHARGE"]]*0.23);
    setDamages([talismanDmg.toFixed(2), talismanInt, slashDmg.toFixed(2), chargeDmg.toFixed(2)]);
  }
  
  const calcDmg = (e) => {
    let tao_value = e.target.value;
    
    setTaoValue(tao_value);
  }

  useEffect(() => {changeDmgValues(taoValue)}, [taoValue, upgrades]);

  return (
    <div className="dmg-calc">
          <table>
            <th>Damage</th>
            <tr>
              <td>Slash</td>
              <td>Talisman</td>
              <td>Charged Strike</td>
            </tr>
            <tr>
              <td>{damages[DMG_LIST["SLASH"]]}</td>
              <td>{damages[DMG_LIST["TALISMAN"]]}</td>
              <td>{damages[DMG_LIST["CHARGE"]]}</td>
            </tr>
          </table>
          <label htmlFor="tao">
            <h2>Tao Fruits: </h2>
            <input type="number" name="tao" id="tao-selector" min={0} max={25} onChange={calcDmg}/>
          </label>
          {/* <span>Base Slash: <span id="base-slash"></span></span>
          <span>Base Talisman: <span id="base-slash">32</span> + <span id="base-slash">32</span></span>
          <span>Base Charged Strike: <span id="base-slash">64</span></span> */}
    </div>
  )
}
