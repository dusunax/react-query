export function Person({ name, hairColor, eyeColor }) {
  return (
    <li>
      {name}
      <ul>
        <li>머리 색: {hairColor}</li>
        <li>눈 색: {eyeColor}</li>
      </ul>
    </li>
  );
}
