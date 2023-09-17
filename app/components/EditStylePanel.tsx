import { useAtom } from "jotai";
import { styleAtom as styleAtom } from "../state";
import { styles } from "../style";

export function EditStylePanel() {
  const [style, setStyle] = useAtom(styleAtom);

  const styleItems = [];
  for (const style of styles) {
    const styleItem = (
      <option
        value={style.name}
        onSelect={(e) => {
          const name = e.currentTarget.value;
          const style = styles.find((s) => s.name === name);
          if (!style) {
            throw new Error("style not found");
          }
          setStyle(style);
        }}
      >
        {style.name}
      </option>
    );
    styleItems.push(styleItem);
  }
  const selectStyle = (
    <select
      className="select select-bordered w-full max-w-xs my-2"
      value={style.name}
      onChange={(e) => {
        const selected = styles.find((x) => x.name == e.target.value);
        if (!selected) return;
        setStyle(selected);
      }}
    >
      {styleItems}
    </select>
  );
  const textarea = (
    <textarea
      className="textarea textarea-bordered"
      placeholder="Input your CSS here"
      onChange={(e) => {
        const newStyle = {
          ...style,
          css: e.target.value,
        };
        setStyle(newStyle);
      }}
      value={style.css}
      rows={10}
    ></textarea>
  );
  const card = (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center">Style</h2>
        <div></div>
        {selectStyle}
        {textarea}
        <div className="card-actions justify-center"></div>
      </div>
    </div>
  );
  return card;
}
