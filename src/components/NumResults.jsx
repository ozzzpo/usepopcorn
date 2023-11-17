export default function NumResults({ movies }) {
  return (
    <p className='num-results'>
      Результатов найдено: <strong>{movies.length}</strong>
    </p>
  );
}
