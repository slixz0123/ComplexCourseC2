
document
  .getElementById("addRowObjetivo")
  .addEventListener("click", function () {
    let table = document.querySelector("#objetivoTable tbody");
    if (table) {
      let newRow = table.insertRow();

      newRow.innerHTML = `
              <td><textarea name="unidad_competencia[]" rows="3" class="form-control"></textarea></td>
              <td><textarea name="elementos_competencias[]" rows="3" class="form-control"></textarea></td>
              <td><textarea name="resultados_aprendizaje[]" rows="3" class="form-control"></textarea></td>
              <td><textarea name="forma_evidenciar[]" rows="3" class="form-control"></textarea></td>
              <td><button type="button" class="btn btn-danger btn-sm deleteRow">Eliminar</button></td>
          `;
    }
  });

document
  .getElementById("addRowContenido")
  .addEventListener("click", function () {
    let table = document.querySelector("#contenidoTable tbody");
    if (table) {
      let newRow = table.insertRow();

      newRow.innerHTML = `
      <td><input type="text" name="dia[]" class="form-control"></td>
      <td><textarea name="contenidos[]" rows="3" class="form-control"></textarea></td>
      <td><input type="number" name="hora_clase[]" class="form-control"></td>
      <td><textarea name="actividades_docencia[]" rows="3" class="form-control"></textarea></td>
      <td><input type="number" name="hora_practica[]" class="form-control"></td>
      <td><textarea name="actividades_practicas[]" rows="3" class="form-control"></textarea></td>
      <td><input type="number" name="hora_autonomo[]" class="form-control"></td>
      <td><textarea name="actividades_autonomo[]" rows="3" class="form-control"></textarea></td>
      <td><textarea name="observacion[]" rows="3" class="form-control"></textarea></td>
      <td><button type="button" class="btn btn-danger btn-sm deleteRow">Eliminar</button></td>
  `;
    }
  });

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteRow")) {
    let rowToDelete = event.target.closest("tr");
    rowToDelete.parentElement.removeChild(rowToDelete);
  }
});
