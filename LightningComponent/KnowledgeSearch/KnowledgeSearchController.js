({
    init : function(component, event, helper) {
        console.log("init");
    },
    handleKeyDown : function(component, event, helper) {
        component.set("v.keydownValue", event.keyCode);
    },
	handleKeyUp : function(component, event, helper) {
        var keydownValue = component.get("v.keydownValue");
        //Press Enter IME変換時のdown時のkeyCodeが13にならないことを利用して純粋なEnterのみを取得
        if (event.keyCode == "13" && keydownValue == "13") {
            
            console.log("Search Keyrord:" + component.get("v.searchKeyword"));
            
            var action = component.get("c.searchArticles");
        	action.setParams({"searchKeyword": component.get("v.searchKeyword")});
        	action.setCallback(this, function(response) {
            	var state = response.getState();
            	if(component.isValid() && state == "SUCCESS"){
                    console.log(response.getReturnValue());
		            component.set("v.articles", response.getReturnValue());
                }
            });
            $A.enqueueAction(action);
        }
	}
})