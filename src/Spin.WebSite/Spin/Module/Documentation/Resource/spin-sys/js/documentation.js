/*
{
  text: "Node 1",
  icon: "glyphicon glyphicon-stop",
  selectedIcon: "glyphicon glyphicon-stop",
  color: "#000000",
  backColor: "#FFFFFF",
  href: "#node-1",
  selectable: true,
  state: {
    checked: true,
    disabled: true,
    expanded: true,
    selected: true
  },
  tags: ['available'],
  nodes: [
    {},
    ...
  ]
}
*/
var tree = [];

var spinTree = {
    changePage: function (name) {
        document.location.hash = name;
        if (spinTree.nodeSelected != null && spinTree.nodeSelected.page != name)
            spinTree.loadPage();
    },
    loadPage: function () {
        if (spinTree.nodeSelected == null) {
            spinTree.nodeSelected = spinTree.getNodeById($("#className").val());
            spinTree.expandParents(spinTree.nodeSelected);
            //selectNode

            if (spinTree.nodeSelected != null)
                $("#tree").treeview("selectNode", spinTree.nodeSelected.nodeId);
        }

        /*
            if (document.location.hash != undefined) {
                $.get(document.location.hash.substring(1), function (data) {
                    $("#page").html(data);
                });
            }
            */
    },
    getListnodes: function () {
        var treeViewObject = $("#tree").data("treeview"),
            allCollapsedNodes = treeViewObject.getCollapsed(),
            allExpandedNodes = treeViewObject.getExpanded(),
            allNodes = allCollapsedNodes.concat(allExpandedNodes);

        return allNodes;
    },
    getNodeById: function (id) {
        var result = null;
        $.each(spinTree.getListnodes(), function (key, value) {
            if (value.id != undefined && value.id == id) {
                result = value;
                return;
            }
        });

        return result;
    },
    expandParents: function (node) {
        if (node != null && node.nodeId != undefined) {
            var NodeID = node.nodeId;
            var ParentID = $("#tree").treeview("getParent", NodeID).nodeId;
            //expandNode
            $("#tree").treeview("expandNode", ParentID);

            while (ParentID != undefined) {
                ParentID = $("#tree").treeview("getParent", ParentID).nodeId;
                if (ParentID != undefined) $("#tree").treeview("expandNode", ParentID);
            }
        }
    },
    //Property
    nodeSelected: null
};

/*Load Tree*/
$.get("/Site/Documentation/Home/GetTree", function (data) {
    tree = data;
    $("#tree").treeview({
        data: tree,
        collapseIcon: "fas fa-chevron-down",
        expandIcon: "fas fa-chevron-right",
        emptyIcon: "",
        onNodeSelected: function (event, data) {
            if (data.href != undefined && decodeURIComponent(document.location.pathname) != data.href)
                document.location = data.href;
        }
    });

    /*validate page*/
    spinTree.loadPage();
});

/**
 * Create function copy
 */
var helperDocumentation = {
    copy: function (text) {
        var clipboardCopySupported =
            document.queryCommandSupported && document.queryCommandSupported("copy");
        if (!clipboardCopySupported) {
            return false;
        }
        const txt = document.createElement("textarea");
        //txt.setAttribute(contentAttrs.name, getName(owner));
        txt.textContent = text.replace(/<br>/g, "\n");
        txt.classList.add("visually-hidden");
        document.body.appendChild(txt);
        txt.select();
        try {
            return document.execCommand("copy");
        } catch (ex) {
            return false;
        } finally {
            document.body.removeChild(txt);
        }
    }
};

/*code*/
hljs.configure({ useBR: true });
hljs.initHighlightingOnLoad();
//$('.cs').html($('.cs').html().replace(/<br>/g,"\n"));

$("#copyInstance").click(function () {
    helperDocumentation.copy($("#codeInstance").html());
});
