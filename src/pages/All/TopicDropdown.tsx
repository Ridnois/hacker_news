import { Dropdown, TopicBox } from "../../components"; 

export interface IDropdown {
  label: string;
  callback: (...args: any[]) => any
}

const TopicDropdown:React.FC<IDropdown> = (props) => {
  return (
    <Dropdown {...props}>
      <TopicBox label="Angular" value="angular">
          <div className="option-box">
            <img alt="Angular" className="option-box__image" src="./image-138.png" />
            <h3 className="dropdown__text">Angular</h3>
          </div>
        </TopicBox>
        <TopicBox label="Reactjs" value="reactjs">
          <div className="option-box">
            <img alt="ReactJS" className="option-box__image" src="./image-140.png" />
            <h3 className="dropdown__text">React</h3>
          </div>
        </TopicBox>
        <TopicBox label="Vuejs" value="vuejs">
          <div className="option-box">
            <img alt="Vuejs" className="option-box__image" src="./image-141.png" />
            <h3 className="dropdown__text">Vue</h3>
          </div>
        </TopicBox>

    </Dropdown>
  )
}

export default TopicDropdown;
