function togglePanel() {
    const leftPanel = document.querySelector('.leftpanel');
    const hideBtn = document.querySelector('.hide-btn i');
    const canvas = document.querySelector('.canvas');

    hideBtn.addEventListener('click', () => {
        leftPanel.classList.toggle('collapsed');

        if (leftPanel.classList.contains('collapsed')) {
            hideBtn.classList.replace('ri-arrow-left-s-line', 'ri-arrow-right-s-line');
            canvas.style.maxWidth = '82%';
        } else {
            hideBtn.classList.replace('ri-arrow-right-s-line', 'ri-arrow-left-s-line');
            canvas.style.maxWidth = '70%';
        }
    });

}

togglePanel();

const mainCanvas = document.querySelector(".mainCanvas")
const toolbarBtns = document.querySelectorAll(".toolbar .buttons")
const layersBox = document.querySelector(".layers")

const xInp = document.querySelector(".x-axis")
const yInp = document.querySelector(".y-axis")
const wInp = document.querySelector(".width")
const hInp = document.querySelector(".height")
const rInp = document.querySelector(".rotation")
const brInp = document.querySelector(".radius")
const colorInp = document.querySelector(".color")

let activeTool = "select"
let selectedEl = null
let isDragging = false
let drawStartX = 0
let drawStartY = 0
let startX = 0
let startY = 0
let elX = 0
let elY = 0
let zIndex = 1
let elementCount = 2

function setTool(tool) {
    activeTool = tool
    toolbarBtns.forEach(b => b.classList.remove("active"))
    document.querySelector(`.buttons.${tool}`)?.classList.add("active")

    if (tool === "rectangle") mainCanvas.style.cursor = "crosshair"
    else if (tool === "move") mainCanvas.style.cursor = "grab"
    else if (tool === "text") mainCanvas.style.cursor = "text"
    else mainCanvas.style.cursor = "default"
}

toolbarBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.classList.contains("click")) setTool("select")
        if (btn.classList.contains("move")) setTool("move")
        if (btn.classList.contains("rectangle")) setTool("rectangle")
        if (btn.classList.contains("text")) setTool("text")
    })
})

mainCanvas.addEventListener("mousedown", e => {
    if (activeTool !== "rectangle") return

    const rect = document.createElement("div")
    rect.className = "rect"
    rect.id = "element-" + (++elementCount)
    rect.style.position = "absolute"
    rect.style.left = e.offsetX + "px"
    rect.style.top = e.offsetY + "px"
    rect.style.width = "0px"
    rect.style.height = "0px"
    rect.style.background = "#40CA57"
    rect.style.zIndex = ++zIndex

    mainCanvas.appendChild(rect)
    addLayer(rect, "rect")

    selectedEl = rect
    drawStartX = e.offsetX
    drawStartY = e.offsetY
    isDragging = true

    document.onmousemove = ev => {
        rect.style.width = Math.abs(ev.offsetX - drawStartX) + "px"
        rect.style.height = Math.abs(ev.offsetY - drawStartY) + "px"
        rect.style.left = Math.min(ev.offsetX, drawStartX) + "px"
        rect.style.top = Math.min(ev.offsetY, drawStartY) + "px"
        updatePanel()
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        isDragging = false
    }
})

mainCanvas.addEventListener("click", e => {
    if (activeTool !== "text") return

    const text = document.createElement("p")
    text.contentEditable = true
    text.innerText = ""
    text.id = "element-" + (++elementCount)
    text.style.position = "absolute"
    text.style.left = e.offsetX + "px"
    text.style.top = e.offsetY + "px"
    text.style.fontSize = "16px"
    text.style.color = "#fff"
    text.style.fontFamily = "Space Grotesk, sans-serif"
    text.style.outline = "none"
    text.style.cursor = "text"
    text.style.zIndex = ++zIndex

    mainCanvas.appendChild(text)
    addLayer(text, "text")
    selectElement(text)
    text.focus()

    text.addEventListener("blur", () => {
        if (text.innerText.trim() === "") {
            text.innerText = "Text"
        }
        text.contentEditable = false
    })
})


function enableMove(el) {
    el.addEventListener("mousedown", e => {
        if (activeTool !== "move") return
        selectedEl = el
        el.style.zIndex = ++zIndex
        isDragging = true
        startX = e.clientX
        startY = e.clientY
        elX = el.offsetLeft
        elY = el.offsetTop

        document.onmousemove = ev => {
            el.style.left = elX + (ev.clientX - startX) + "px"
            el.style.top = elY + (ev.clientY - startY) + "px"
            updatePanel()
        }

        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
            isDragging = false
        }
    })

    el.addEventListener("click", e => {
        e.stopPropagation()
        selectElement(el)
    })
}

function selectElement(el) {
    selectedEl = el
    el.style.zIndex = ++zIndex
    highlightLayer()
    updatePanel()
}

function addLayer(el, type) {
    const layer = document.createElement("div")
    layer.className = "layer"
    layer.dataset.target = el.id

    layer.innerHTML = `
        <section class="layer-left">
            <i class="${type === "text" ? "ri-text" : "ri-checkbox-blank-line"}"></i>
            <span>${type === "text" ? "Text" : "Rectangle"} ${elementCount}</span>
        </section>
    `
    layersBox.appendChild(layer)

    layer.addEventListener("click", () => {
        const target = document.getElementById(layer.dataset.target)
        if (!target) return
        selectElement(target)
    })

    enableMove(el)
}

function highlightLayer() {
    document.querySelectorAll(".layer").forEach(l => l.classList.remove("active"))
    if (!selectedEl) return
    document.querySelector(`.layer[data-target="${selectedEl.id}"]`)?.classList.add("active")
}

function updatePanel() {
    if (!selectedEl) return
    xInp.value = selectedEl.offsetLeft
    yInp.value = selectedEl.offsetTop
    wInp.value = selectedEl.offsetWidth || 0
    hInp.value = selectedEl.offsetHeight || 0
    rInp.value = selectedEl.dataset.rotate || 0
    brInp.value = selectedEl.style.borderRadius?.replace("px", "") || 0
}

xInp.oninput = () => selectedEl && (selectedEl.style.left = xInp.value + "px")
yInp.oninput = () => selectedEl && (selectedEl.style.top = yInp.value + "px")
wInp.oninput = () => selectedEl && (selectedEl.style.width = wInp.value + "px")
hInp.oninput = () => selectedEl && (selectedEl.style.height = hInp.value + "px")
brInp.oninput = () => selectedEl && (selectedEl.style.borderRadius = brInp.value + "px")

rInp.oninput = () => {
    if (!selectedEl) return
    selectedEl.dataset.rotate = rInp.value
    selectedEl.style.transform = `rotate(${rInp.value}deg)`
}

colorInp.oninput = () => {
    if (!selectedEl) return
    if (selectedEl.tagName === "P") selectedEl.style.color = colorInp.value
    else selectedEl.style.background = colorInp.value
}

window.addEventListener("keydown", e => {
    if (e.key === "v") setTool("select")
    if (e.key === "s") setTool("move")
    if (e.key === "r") setTool("rectangle")
    if (e.key === "t") setTool("text")
    if (e.key === "Delete" && selectedEl) {
        document.querySelector(`.layer[data-target="${selectedEl.id}"]`)?.remove()
        selectedEl.remove()
        selectedEl = null
    }
})

document.querySelectorAll(".rect").forEach(r => {
    enableMove(r)
})

setTool("select");