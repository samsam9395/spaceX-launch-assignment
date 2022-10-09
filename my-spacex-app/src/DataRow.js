function DataRow(res) {
  const date = res.res.launch_date_local.split('T')[0].replaceAll('-', '/');

  return (
    <tr>
      <td className="tg-row">{res.res.mission_name}</td>
      <td className="tg-row">{res.res.rocket.rocket_name}</td>
      <td className="tg-row">{res.res.rocket.rocket_type}</td>
      <td className="tg-row">{date}</td>
    </tr>
  );
}

export default DataRow;
