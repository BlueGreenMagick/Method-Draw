window.ankiAddonSetImg = function (data, type) {
    if (type == "svg") {
        svgString = atob(data)
        svgCanvas.setSvgString(svgString);
        methodDraw.Editor.updateCanvas()
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
            svgCanvas.setHref(newImage, data);
            svgCanvas.selectOnly([newImage]);
            svgCanvas.alignSelectedElements("m", "page")
            svgCanvas.alignSelectedElements("c", "page")
            svgCanvas.clearSelection()
            methodDraw.Editor.updateContextPanel();
            methodDraw.Editor.updateCanvas();
        }
        // put a placeholder img so we know the default dimensions
        var img_width = 100;
        var img_height = 100;
        var img = new Image()
        img.src = data
        document.body.appendChild(img);
        img.onload = function () {
            img_width = img.offsetWidth
            img_height = img.offsetHeight
            setImage(img_width, img_height);
            document.body.removeChild(img);
        }
    };
}

window.ankiAddonSaveImg = function(){
    svgCanvas.clearSelection()
    svg_str = svgCanvas.getSvgString()
    pycmd("svg_save:" + svg_str)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function wait_until_pycmd(cb) {
    while(typeof pycmd !== "function") {
        await sleep(100);
    }
    cb();
}

window.addEventListener("load", function (e) {
    console.log("ABC")
    wait_until_pycmd(function(){pycmd("img_src")});
})