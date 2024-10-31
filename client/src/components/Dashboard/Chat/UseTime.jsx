import dayjs from 'dayjs';

export const UseTime = () => {
  const date = dayjs('2024-11-01');
  return (
    <div>
      <h1>Formatting a Date</h1>
      <p>Default: {date.format()}</p>
      <p>Custom: {date.format('DD/MM/YYYY')}</p>
    </div>
  );
};
