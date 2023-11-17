import { useRef } from "react";
import { useKey } from "../../utils/hooks/useKey";

export default function Search({ value, setValue }) {
  const inputEl = useRef(null);

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setValue("");
  });

  return (
    <input
      className='search'
      type='text'
      placeholder='Ищите фильмы...'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      ref={inputEl}
    />
  );
}
