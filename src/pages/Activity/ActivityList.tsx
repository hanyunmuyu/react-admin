import React, {Component} from "react";
import {getActivityList} from "../../api/activity";

export default class ActivityList extends Component<any, any> {
    getActivityList = (page: number = 1) => {
        getActivityList(page).then(response => {
            console.log(response.data)
        })
    }

    componentDidMount() {
        this.getActivityList()
    }

    render() {
        return (
            <>
            </>
        )
    }
}
