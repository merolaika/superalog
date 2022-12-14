function newNodesValues() {
    const MODULE_NAME = 'Nodes Values'
    const logger = newWebDebugLog()
    

    let thisObject = {
        onRecordChange: onRecordChange,
        initialize: initialize,
        finalize: finalize
    }

    let hiriarchyMap
    return thisObject

    function finalize() {
        hiriarchyMap = undefined
    }

    function initialize(pRootNode) {
        let rootNode = UI.projects.workspaces.spaces.designSpace.workspace.getHierarchyHeadsById(pRootNode.id)
        hiriarchyMap = UI.projects.visualScripting.utilities.hierarchy.getHiriarchyMap(rootNode)
    }

    function onRecordChange(currentRecord) {
        if (currentRecord === undefined) { return }
        let array = currentRecord.values
        if (array === undefined) { return }
        for (let i = 0; i < array.length; i++) {
            let arrayItem = array[i]
            let nodeId = arrayItem[0]
            let value = arrayItem[1]
            applyValue(nodeId, value)
        }
    }

    function applyValue(nodeId, value) {
        if (UI.projects.foundations.spaces.chartingSpace.visible !== true) { return }
        let node = hiriarchyMap.get(nodeId)
        if (node === undefined) { return }
        if (node.payload === undefined) { return }
        if (node.payload.uiObject === undefined) { return }
        if (value === true) { value = 'true' }
        if (value === false) { value = 'false' }
        node.payload.uiObject.valueAtAngle = false
        node.payload.uiObject.setValue(value, 1, 10)
    }
}

