import React from 'react';

const TableRow = ({ tableRow }) => {
  const renderCell = (key, value, index) => {
    if (typeof value === "object" && value !== null) {
      return (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {Object.entries(value).map(([subKey, subValue], subIndex) => (
              <tr key={`${index}-${subIndex}`}>
                <td style={{ fontWeight: "bold", paddingRight: "10px" }}>{subKey}</td>
                <td>{renderCell(subKey, subValue, `${index}-${subIndex}`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return value;
    }
  };

  return (
    <tr>
      {Object.entries(tableRow).map(([key, value], index) => (
        <td key={key} style={{ verticalAlign: "top", border: "1px solid #333", padding: "5px" }}>
          {renderCell(key, value, index)}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
