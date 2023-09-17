
function CheckboxForm() {
  const checkboxes = [];

  for (let x = 1; x <= 90; x++) {
    const id = `c${x}`;
    checkboxes.push(
      // <div key={id}>
      <>
        <input
          type="checkbox"
          name="num[]"
          className="chk-btn"
          value={x}
          id={id}
        />
        <label htmlFor={id}>{x}</label>
      </>

      // </div>
    );
  }

  return (
    <>
      {checkboxes}
    </>
  );
}

export default CheckboxForm;
