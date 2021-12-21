import React from "react";
import SortableList from "erxes-ui/lib/components/SortableList";
import CodeBlock from "@theme/CodeBlock";
import { renderApiTable, stringify } from "../common.js";
import styles from "../../../src/components/styles.module.css";

export function SortableListComponent(props) {
  const { type, table = [] } = props;

  // const arrays = ["Name", "Age", "School"];

  const array = [
    { _id: 0, field: "Name" },
    { _id: 1, field: "Age" },
    { _id: 2, field: "School" },
  ];

  const propDatas = () => {
    // let array = [];

    // arrays.map((arr, index) => {
    // array.push({ _id: index, field: arr });
    // });

    return array;
  };

  const child = (array) => {
    return <div> {array.field}</div>;
  };

  // function onChangeItems(updatedItems, destinationIndex) {
  // setItems(updatedItems);
  // props.updateOrderItems(updatedItems[destinationIndex], destinationIndex);
  // }

  const onChangeFields = (reorderedArray) => {
    return array = reorderedArray;
  };

  const renderBlock = () => {
    return (
      <>
        <div className={styles.styled}>
          <SortableList
            fields={propDatas()}
            child={child}
            onChangeFields={onChangeFields}
            droppableId="droppable"
          />
        </div>
        {/* <CodeBlock className="language-jsx">
          {`<>\n\t<SortableList
            fields={propDatas()}
            child={child}
            // isDragDisabled={true}
            // showDragHandler={false}
            onChangeFields={onChangeFields}
            droppableId="droppable"
            /> \n</>`}
        </CodeBlock> */}
      </>
    );
  };

  if (type === "APIsortablelist") {
    return renderApiTable("Sortablelist", table);
  }

  return renderBlock("");
}