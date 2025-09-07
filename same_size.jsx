// Resize images to a user-specified size - must be perfect squares
(function () {
  if (!app.documents.length) { alert("No document open"); return; }
  var doc = app.activeDocument;

  var input = prompt("Enter target size in px (width and height):", "100");
  if (!input) { return; } // cancelled
  var TARGET = parseFloat(input);
  if (isNaN(TARGET) || TARGET <= 0) {
    alert("Invalid number.");
    return;
  }

  var rasters = [];
  for (var i = 0; i < doc.pageItems.length; i++) {
    if (doc.pageItems[i].typename === "RasterItem") {
      rasters.push(doc.pageItems[i]);
    }
  }

  if (!rasters.length) { alert("No RasterItems found."); return; }

  for (var r = 0; r < rasters.length; r++) {
    var img = rasters[r];
    try { img.locked = false; img.hidden = false; } catch (e) {}

    var w = img.width, h = img.height;
    if (!w || !h) continue;

    var sx = (TARGET / w) * 100;
    var sy = (TARGET / h) * 100;
    img.resize(sx, sy);
  }

  alert("Resized " + rasters.length + " image(s) to " + TARGET + " × " + TARGET + " px.");
})();
