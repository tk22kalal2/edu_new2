async function loadLectures(tableId, startId, endId) {
  try {
    const response = await fetch("../Plug/lectures.json?nocache=" + new Date().getTime());
    const data = await response.json();
    const tableBody = document.querySelector(`#${tableId} tbody`);

    // Clear existing content
    tableBody.innerHTML = "";

    // Filter lectures based on range
    const filteredLectures = data.lectures.filter(
      (lecture) => lecture.id >= startId && lecture.id <= endId
    );

    // Insert filtered lectures into table
    filteredLectures.forEach((lecture) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${lecture.id}</td>  
        <td>${lecture.html}</td>  
      `;

      row.id = `lecture-${lecture.id}`; // Assign unique row ID
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error("Error loading lectures:", error);
  }
}

// Search function to filter based on Lecture Name (NOT ID)
function tableSearch() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById('input-box');
  filter = input.value.toUpperCase();
  table = document.getElementById('myTable');
  tr = table.getElementsByTagName('tr');

  for (i = 0; i < tr.length; i++) {
    // Get the LECTURE NAME column (2nd column, index 1)
    td = tr[i].getElementsByTagName('td')[1]; 
    
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = ''; // Show row
      } else {
        tr[i].style.display = 'none'; // Hide row
      }
    }
  }
}
