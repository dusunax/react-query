export function Species({ name, language, averageLifespan }) {
  return (
    <div>
      <strong>{name}</strong>
      <ul>
        <li>언어: {language}</li>
        <li>평균 수명: {averageLifespan}</li>
      </ul>
    </div>
  );
}
