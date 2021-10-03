import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import DefaultStructure from "../../layouts/defaultStructure";
import { getQueryChart, getReports } from "../../store/actions/dashboard";
import TotalCard from "./components/TotalCard";

const Dashboard = () => {

    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(state => state.auth.user);
    const [totalUser, setTotalUser] = useState(0);
    const [totalNewUser, setTotalNewUser] = useState(0);
    const [totalInActiveUser, setTotalInActiveUser] = useState(0);

    const [redirect, setRedirect] = useState( false );
    const userReauthenticate = ({ message }) =>{
        toast.error(message, {
            onOpen: () => setRedirect( true ) 
        });
    }

    useEffect(()=>{
        _loadReports();
    },[]);

    const _loadReports = (filter = {}) =>{
        setIsLoading(true);
        getReports(filter).then(res => {
            setIsLoading(false);
            if( !res.error ){
                const { data } = res;
                
                if(data){
                    setTotalUser(data.totaluser);
                    setTotalNewUser(data.totalnewuser);
                }
            }
            if( res.redirect )
                userReauthenticate( res );
        })
    }

    const _submitHandler = (data) => {
        const { from_date, to_date } = data;
        _loadReports({from_date : from_date.value, to_date: to_date.value});
    }

    const _resetFilterHandler = () => {
        _loadReports();
    }

    const _refreshData = () =>{
        _loadReports();
    }

    if( redirect )
        return <Redirect to="/login"/>

    //console.log(user);

    return (
        <DefaultStructure pageTitle={`Welcome  ${user && user.first_name} ${user && user.last_name}`}>
            <div className="dashboard_main">
                <h2 className="titld">Dashboard</h2>
                <div className="dashboard_card user_card_holder">
                    <div className={isLoading ? "user_card b-color1 isload" : "user_card b-color1"}>
                        <span className="usercrd_ico color1">
                            <img src={require('../../assets/images/group.png').default} alt="user" />
                        </span>
                        <TotalCard 
                            title="Total active user"
                            data={totalUser}
                        />
                        
                    </div>

                    <div className={isLoading ? "user_card b-color2 isload" : "user_card b-color2"}>
                        <span className="usercrd_ico color2">
                            <img src={require('../../assets/images/add-group.png').default} alt="user" />
                        </span>
                        <TotalCard 
                            title="Total new user"
                            data={totalNewUser}
                        />
                    </div>

                    <div className={isLoading ? "user_card b-color8 isload" : "user_card b-color8"}>
                        <span className="usercrd_ico color8">
                            <img src={require('../../assets/images/sad-sleepy-emoticon-face-square.png').default} alt="user" />
                        </span>
                        <TotalCard 
                            title="Total inactive user"
                            data={totalInActiveUser}
                        />
                    </div>
                </div>
            </div>
        </DefaultStructure>
    )
};

export default Dashboard;