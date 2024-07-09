export function Skill({ skillCounter, skill, id, hover, selectionNumber }) {
  let skillName = skill.name;

  let imgSrc = `./images/${skillName.toLowerCase()}.webp`;
  let itemId = id + "" + skillName;
  let selection = selectionNumber.findIndex((item) => item == id) + 1;

  const skillForm = () => {
    let list = [1, 20, 21, 33, 34, 35];
    if (list.includes(id)) {
      return "rhombus";
    }
    return "circle";
  };
  
  return (
    <>
      <button
        className={`skillbutton ${skillForm()}`}
        onClick={skillCounter}
        id={itemId}
        onMouseOver={() => hover(skill)}
      >
        <img src={imgSrc} alt={skillName} />
        <div className={`selection-number`}>{(selection > 0) && selection}</div>
      </button>
    </>
  );
}