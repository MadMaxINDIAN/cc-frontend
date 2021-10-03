class StateLoader {

    loadState() {
        try {
            const serializedState = localStorage.getItem("http://localhost:state");

            if (serializedState === null) {
                return this.initializeState();
            }

            return JSON.parse(serializedState);
        }
        catch (err) {
            return this.initializeState();
        }
    }

    saveState(state) {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem("http://localhost:state", serializedState);
            this.state = serializedState;
        }
        catch (err) {
            console.log(err);
        }
    }

    initializeState() {
        console.log(this.state);
        return {};
    };
}


export default StateLoader;