// Load saved students from Local Storage
document.addEventListener('DOMContentLoaded', function() {
  const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
  savedStudents.forEach(addStudentToTable);
});

// Form submission handler
document.getElementById('studentForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get input values
  const roll = document.getElementById('roll').value;
  const amount = document.getElementById('amount').value;

  // Validate inputs
  if (roll.trim() === '' || amount.trim() === '') {
    alert('Please fill out all fields.');
    return;
  }

  // Ask for admin password
  const password = prompt('Enter the admin password to add this entry:');

  // Replace 'your-password' with your desired password
  if (password === 'A@s#d?f!>79') {
    // Save student data to Local Storage
    const student = { roll, amount };
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    // Add student to the table
    addStudentToTable(student);

    // Clear the form
    document.getElementById('roll').value = '';
    document.getElementById('amount').value = '';

    alert('Entry successfully added!');
  } else {
    alert('Incorrect password. You are not authorized to add this entry.');
  }
});

// Function to add student to the table
function addStudentToTable(student) {
  const table = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();

  const rollCell = newRow.insertCell(0);
  const amountCell = newRow.insertCell(1);
  const actionCell = newRow.insertCell(2);

  rollCell.textContent = student.roll;
  amountCell.textContent = student.amount;

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.style.backgroundColor = '#ff4d4d';
  deleteButton.style.color = 'white';
  deleteButton.style.border = 'none';
  deleteButton.style.borderRadius = '5px';
  deleteButton.style.padding = '5px 10px';
  deleteButton.style.cursor = 'pointer';

  actionCell.appendChild(deleteButton);

  // Delete button click event
  deleteButton.addEventListener('click', function() {
    // Ask for password
    const password = prompt('Enter the admin password to delete:');

    // Replace 'your-password' with your desired password
    if (password === 'A@s#d?f!>79') {
      // Confirmation
      const confirmDelete = confirm('Are you sure you want to delete this entry?');
      if (confirmDelete) {
        // Remove student from Local Storage
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students = students.filter(s => s.roll !== student.roll);
        localStorage.setItem('students', JSON.stringify(students));

        // Remove row from table
        table.deleteRow(newRow.rowIndex - 1);
        alert('Entry successfully deleted!');
      }
    } else {
      alert('Incorrect password. You are not authorized to delete this entry.');
    }
  });
}
