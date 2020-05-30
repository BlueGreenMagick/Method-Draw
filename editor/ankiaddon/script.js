var setImg = function (path, type) {
    if (type == "svg") {

    } else {
        setImage = function (img_width, img_height) {
            svgCanvas.setResolution(img_width, img_height)
            var newImage = svgCanvas.addSvgElementFromJson({
                "element": "image",
                "attr": {
                    "x": 0,
                    "y": 0,
                    "width": img_width,
                    "height": img_height,
                    "id": svgCanvas.getNextId(),
                    "style": "pointer-events:inherit"
                }
            });
            svgCanvas.setHref(newImage, path); 
            svgCanvas.selectOnly([newImage]);
            svgCanvas.alignSelectedElements("m", "page")
            svgCanvas.alignSelectedElements("c", "page")
            updateContextPanel();
            updateCanvas();
        }
        // put a placeholder img so we know the default dimensions
        var img_width = 100;
        var img_height = 100;
        var img = new Image()
        img.src = path
        document.body.appendChild(img);
        img.onload = function () {
            img_width = img.offsetWidth
            img_height = img.offsetHeight
            setImage(img_width, img_height);
            document.body.removeChild(img);
        }
    };
}
}

document.addEventListener("load", function () {
    pycmd("img_src");
})