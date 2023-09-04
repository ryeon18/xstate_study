import React, { Fragment, useMemo } from "react";
import "./App.css";
import { useMachine, useSelector } from "@xstate/react";
import { Link } from "react-router-dom";
import { ConvertMachine, LeftMenuXstate,State, PropertyMenu, ViewerOption } from "./ConvertMachine";

export const ConvertRedux = () => {
  const Machine = useMemo(() => ConvertMachine, []);
  // 머신 객체가 렌더링 사이에 변경되지 않도록 useMemo를 사용합니다.
  // useMemo를 사용함으로써 Machine 객체를 캐싱하고, 이를 useMachine에 전달합니다.
  // useMemo의 첫번째 인자로 Machine을 반환하는 콜백함수를 전달하였고, 두번째 인자로는 빈 배열을 전달하여 trafficLightMachine 객체가 변경될 때마다 다시 계산되지 않도록 하였습니다.
  // 머신 객체가 변경되면, useMachine은 새로운 머신 인스턴스를 생성합니다.
  // 이는 머신의 상태를 초기화하고, 모든 이벤트를 취소합니다.
  // 머신 객체가 변경되지 않는 한, useMachine은 항상 동일한 머신 인스턴스를 반환합니다.
  // Xstate의 머신은 객체이며, 불변성을 유지해야 합니다.
  // 생성 후에는 머신 객체가 수정되서는 안된다.
  const [state, send] = useMachine(Machine);


  const statesVale = state.context as unknown as State;

  console.log('statesVale', statesVale)

  const handleLeftMenu = (value: LeftMenuXstate) => {
    if(LeftMenuXstate.property === value){
        send({ type: "SELECT_LEFT_MENU", value: LeftMenuXstate.property })
    } else if(LeftMenuXstate.none === value){
        send({ type: "SELECT_LEFT_MENU", value: LeftMenuXstate.none })
    } else if(LeftMenuXstate.measure === value){
        send({ type: "SELECT_LEFT_MENU", value: LeftMenuXstate.measure })
    } else if(LeftMenuXstate.material === value){
        send({ type: "SELECT_LEFT_MENU", value: LeftMenuXstate.material })
    } else if(LeftMenuXstate.screenShot === value){
        send({ type: "SELECT_LEFT_MENU", value: LeftMenuXstate.screenShot })
    } else return;
  }

  const handlePropertyMenu = (value: PropertyMenu) => {
    if(PropertyMenu.none === value){
        send({ type: "SELECT_PROPERTY_MENU", value: PropertyMenu.none })
    } else if(PropertyMenu.byStory === value){
        send({ type: "SELECT_PROPERTY_MENU", value: PropertyMenu.byStory })
    } else if(PropertyMenu.bySpace === value){
        send({ type: "SELECT_PROPERTY_MENU", value: PropertyMenu.bySpace })
    } else if(PropertyMenu.byPart === value){
        send({ type: "SELECT_PROPERTY_MENU", value: PropertyMenu.byPart })
    } else if(PropertyMenu.byMaterial === value){
        send({ type: "SELECT_PROPERTY_MENU", value: PropertyMenu.byMaterial })
    } else return;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    send({type:"SELECT_PART", value:{ check: { [event.target.value]: event.target.checked },
    totalLength: PART.length}})
  };

  const {open} = statesVale.resultWindow;

  const viewOption = statesVale.viewerOption;


  console.log('viewOption', viewOption)
  
  return (
    <div className="wrap convert">
      <h2>💡 LeftMenuActive Status: {statesVale.leftMenu.active}</h2>
      <button>
      leftMenu
      </button>
      <button onClick={()=>handleLeftMenu(LeftMenuXstate.measure)}>
      measure
      </button>
      <h2>💡 PROPERTY Status: {statesVale.leftMenu.propertyMenu.active}</h2>
      <button onClick={()=>handlePropertyMenu(PropertyMenu.byStory)}>
      property
      </button>
      <button onClick={()=>handlePropertyMenu(PropertyMenu.byPart)}>
      byPart
      </button>
      <h2>💡 selectedStory Status: {statesVale.leftMenu.propertyMenu.selectedStory}</h2>
      <button onClick={()=>send({type:"SELECT_STORY", value: "2F"})}>
      SELECT_STORY 2F
      </button>
      <button onClick={()=>send({type:"SELECT_STORY", value: "5F"})}>
      SELECT_STORY 5F
      </button>
      <h2>SELECT_PART</h2>
      {PART.map((part) => (
            <Fragment key={part.id}>
            <label>
                <input type="checkbox" name="select_part" checked={statesVale.leftMenu.propertyMenu.selectedPart[part.name] || false} onChange={handleChange} value={part.name}/> 
            {part.name}
            </label>
            </Fragment>        
            )
        )}

    <h2>rightMenu OPEN VIEWER OPTION</h2>
      <button onClick={()=>send("OPEN_VIEWER_OPTION")}>RightMenu</button>

      {statesVale.rightMenu.viewerOption && 
        <>
        <h2>rightMenu Viewer Option</h2>
        <label><input type="checkbox" checked={viewOption.showWall} onChange={()=>send({type:"SET_VIEWER_OPTION",value:ViewerOption.showWall})}/>벽보여주기</label>
        <label><input type="checkbox" checked={viewOption.showDrawing}  onChange={()=>send({type:"SET_VIEWER_OPTION",value:ViewerOption.showDrawing})}/>도면보여주기</label>
        <label><input type="checkbox" checked={viewOption.showCeil}  onChange={()=>send({type:"SET_VIEWER_OPTION",value:ViewerOption.showCeil})}/>천장보여주기</label>


        </>
      }

    <h2>Open result</h2>
    <button onClick={()=>send({type:"OPEN_RESULT",value:!open})}>Click open result</button>
    {statesVale.resultWindow.open && <h2>Result window</h2>}

      <h2>RESET ALL</h2>
      <button onClick={()=>send("RESET_PROPERTY")}>
      reset
      </button>
      <Link to="/" className="back">
        Go back
      </Link>
    </div>
  );
};

const PART = [
    {id:1, name:"보",},
    {id:2, name:"매트슬래브"},
]