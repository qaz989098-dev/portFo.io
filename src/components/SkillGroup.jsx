import Badge from './Badge';

export default function SkillGroup({ label, items, learning = false }) {
  return (
    <div className="skill-group">
      <h3 className="skill-group__label">{label}</h3>
      <ul className="skill-group__list">
        {items.map((item) => (
          <li key={item}>
            {learning ? (
              <Badge variant="learning">{item}</Badge>
            ) : (
              <Badge>{item}</Badge>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
