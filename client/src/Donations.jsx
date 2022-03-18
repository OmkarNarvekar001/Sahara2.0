import React,{useState,useEffect} from 'react'
import Nav from './Nav'
import Left from './Left'
import './Donations.css'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import DonationsList from './DonationsList';

function Donations() {
    const handleList = (event, newList) => {
        setDonationsList(newList);
    };
    const [donationsList,setDonationsList]=useState('made')
    const [role,setRole]=useState(JSON.parse(localStorage.getItem("user")).role)
    return (
        <div >
            <Nav/>
            <div className='donations_main'>
                <Left current={"donations"}/>
                <div className="donations_content">
                    <div className="donations_toggle">
                        
                    <ToggleButtonGroup
                    value={donationsList}
                    exclusive
                    onChange={handleList}
                    aria-label="text alignment"
                    >
                    <ToggleButton value="made" aria-label="left aligned" >
                        <AccountBalanceWalletOutlinedIcon style={{fill: "white"}}/>
                    </ToggleButton>
                    <ToggleButton value="received" aria-label="centered" >
                        <MonetizationOnOutlinedIcon style={{fill: "white"}}/>
                    </ToggleButton>
                    </ToggleButtonGroup>

                    </div>
                    <div className="notifs">
                        <DonationsList
                            type={donationsList}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Donations
