// Arrange images into a perfect grid - requires images of same dimensions and to be perfect squares (e.g. from same_size.jsx)
(function () {
  if (!app.documents.length) { alert("Open a document first."); return; }
  var doc = app.activeDocument;
  var sel = doc.selection;
  if (!sel.length) { alert("Select the images to grid"); return; }


  var colsInput = prompt("Number of columns?", "5");
  if (!colsInput) return;
  var cols = parseInt(colsInput, 10);
  if (isNaN(cols) || cols < 1) { alert("Invalid number of columns."); return; }


  var spacingInput = prompt("Spacing between images (px)?", "10");
  if (!spacingInput) return;
  var spacing = parseFloat(spacingInput);
  if (isNaN(spacing) || spacing < 0) { alert("Invalid spacing."); return; }


  var sizeInput = prompt("Dimensions of images (all must be the same)", "300");
  var imgSize = sizeInput ? parseFloat(sizeInput) : 300;
  if (isNaN(imgSize) || imgSize <= 0) { alert("Invalid image size."); return; }


  sel.sort(function (a, b) {
    var rowDiff = Math.round((b.top - a.top) / (imgSize / 2));
    if (rowDiff !== 0) return rowDiff; // row order
    return a.left - b.left;            // within row
  });


  for (var i = 0; i < sel.length; i++) {
    var row = Math.floor(i / cols);
    var col = i % cols;
    sel[i].position = [
      col * (imgSize + spacing),  // X
      -row * (imgSize + spacing)  // Y (downward)
    ];
  }


  alert("Arranged " + sel.length + " images into a " + cols + "-column grid.");
})();
