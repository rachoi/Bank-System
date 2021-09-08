import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Datagrid from './Datagrid';
// import validator from 'validator';

import axios from 'axios';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    flexContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        maxWidth: '500px'
    },
    flexGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }


}));

const url = 'https://banking-system-rc.herokuapp.com';
// const url = 'http://localhost:3000';
// const url = 'http://localhost:5000';

//deposit, transfer, withdraw
export default function UtilityForm(props) {
    const classes = useStyles();

    const [user, setUser] = React.useState(props.user);
    const [utilityType, setUtilityType] = React.useState(props.utilityType);

    const [depositValue, setDepositValue] = React.useState("");
    const [withdrawValue, setWithdrawValue] = React.useState("");
    const [transferValue, setTransferValue] = React.useState("");
    const [note, setNoteValue] = React.useState("");

    const [transferEmail, setTransferEmail] = React.useState("");

    const [emailError, setEmailError] = React.useState("");
    const [balanceError, setBalanceError] = React.useState("");
    const [depositError, setDepositError] = React.useState("");

    useEffect( () => {
        setUser(props.user);
        //setting default to summary page
        if(props.user.balance !== undefined && props.utilityType !== "summary" && props.utilityType !== "deposit" && props.utilityType !== "withdraw" && props.utilityType !== "transfer")
        {
            setUtilityType("summary");
        }
        else{
            setUtilityType(props.utilityType);
        }
        resetStates();
    }, [props.user, props.utilityType, utilityType])

    const resetStates = () => {
        setDepositValue("");
        setWithdrawValue("");
        setTransferValue("");
        setNoteValue("");
        setTransferEmail("");
        setEmailError("");
        setBalanceError("");
        setDepositError("");
    }

    const formatToCurrency = amount => {
        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&");
    };

    const handleTransfer = (e) => {
        e.preventDefault();

        //specific cases
        setBalanceError("");
        setEmailError("");
        setDepositError("");

        if(isNaN(transferValue) === true || transferEmail === "") {

            alert('Invalid transfer inputs')
        }
        else{

            let amount = parseFloat(transferValue);
            if(amount > 100000) {
                setDepositError("Amount exceeds $100,000 - enter something smaller")
            }
            else {
                let data = {
                    to: transferEmail,
                    amount: formatToCurrency(amount),
                    note: note
                }
    
                // Attempting to transfer ${data.amount} to ${data.to}'s account
                axios.put(`${url}/transfer`, data)
                .then(res=> {
    
                    if(res.data.foundEmail === false) {
                        // Transfer email does not exist
                        setEmailError("Email you are trying to transfer to does not exist");
                    }
                    else if(res.data.balanceError === true) {
                        // Attempting to transfer more money than balance
                        setBalanceError("Insufficient amount");
                    }
                    else if(res.data.depositError === true) {
                        // Trying to deposit negative value
                        setDepositError("Invalid deposit value");
                    }
                    else{
                        setEmailError("");
                        setBalanceError("");
                        setUtilityType("summary");
                        window.location.reload(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            }
            
            /* if(validator.isEmail(transferEmail)) {
                setEmailError('Valid Email');
                

            } else {
                setEmailError('Enter valid Email!');
            } */
        }
    }
    
    const handleDeposit = (e) => {
        e.preventDefault();
      
        //specific cases
        setBalanceError("");
        setDepositError("");

        if(isNaN(depositValue) === true) {
            alert('Invalid deposit value input');
        }
        else{

            let amount = parseFloat(depositValue);
            if(amount > 100000) {
                setDepositError("Amount exceeds $100,000 - enter something smaller")
            }
            else {
                let data = {
                    amount: formatToCurrency(amount),
                    note: note
                }
        
                // Attempting to deposit ${data.amount} to user's account
                axios.put(`${url}/deposit`, data)
                .then(res=> {
                    if(res.data.depositError === true) {
                        // Trying to deposit negative value
                        setDepositError("Invalid deposit value");
                    }
                    else{
                        // setUtilityType("summary");
                        window.location.reload(false);
                    }
                    
                })
                .catch((error) => {
                    console.log(error);
                })
            }
            
        }
    }

    const handleWithdraw = (e) => {
        e.preventDefault();

        //specific cases
        setBalanceError("");
        setDepositError("");
      
        if(isNaN(withdrawValue) === true) {
            alert('Invalid withdraw value input');
        }
        else{

            let amount = parseFloat(withdrawValue);
            if(amount > 100000) {
                setDepositError("Amount exceeds $100,000 - enter something smaller")
            }
            else {
                let data = {
                    amount: formatToCurrency(amount),
                    note: note
                }
        
                // Attempting to withdraw ${data.amount} to user's account
                axios.put(`${url}/withdraw`, data)
                .then(res=> {
                    if(res.data.balanceError === true) {
                        // Attempting to transfer more money than balance
                        setBalanceError("Insufficient amount");
                    }
                    else if(res.data.depositError === true) {
                        // Trying to deposit negative value
                        setDepositError("Invalid deposit value");
                    }
                    else{
                        setDepositError("");
                        setBalanceError("");
                        // setUtilityType("summary");
                        window.location.reload(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            }
            
        }
    }
    
    const onChangeTransferValue = (e) => {
        e.preventDefault();
    
        const transferValue = e.target.value;
        setTransferValue(transferValue);
    }

    const onChangeTransferEmail = (e) => {
        e.preventDefault();
    
        const transferEmail = e.target.value;
        setTransferEmail(transferEmail);
    }

    const onChangeDepositValue = (e) => {
        e.preventDefault();
        const depositValue = e.target.value;
        setDepositValue(depositValue);
    }

    const onChangeWithdrawValue = (e) => {
        e.preventDefault();

        const withdrawValue = e.target.value;
        setWithdrawValue(withdrawValue);

    }

    const onChangeNoteValue = (e) => {
        e.preventDefault();

        const noteValue = e.target.value;
        setNoteValue(noteValue);
    }

    if(utilityType === "deposit") {
        return (
            <div className={classes.flexContainer}> 
                <Typography variant="h6">
                    Deposit
                </Typography>
                <Typography>
                    Amount you want to deposit in USD (max $100,000)
                </Typography>
                <Typography>
                    {depositError}
                </Typography>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="amount"
                label="Amount"
                type="amount"
                id="depo-amount"
                value={depositValue}
                onChange={onChangeDepositValue}
                />
                <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="note"
                label="Note"
                type="note"
                id="depo-note"
                value={note}
                onChange={onChangeNoteValue}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleDeposit}
                >
                    Deposit
                </Button>
            </div>
        );
    }
    else if(utilityType === "transfer") {
        return (
            <div className={classes.flexContainer}> 
                <Typography variant="h6">
                    Transfer
                </Typography>
                <Typography>
                    Enter the email information of the 
                    person you are transfering to
                </Typography>
                <Typography>
                    {emailError}
                </Typography>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="trans-email"
                value={transferEmail}
                onChange={onChangeTransferEmail}
                />
                <Typography>
                    Amount you want to transfer in USD (max $100,000)
                </Typography>
                <Typography>
                    {balanceError}
                </Typography>
                <Typography>
                    {depositError}
                </Typography>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="amount"
                label="Amount"
                type="amount"
                id="trans-amount"
                value={transferValue}
                onChange={onChangeTransferValue}
                />
                <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="note"
                label="Note"
                type="note"
                id="trans-note"
                value={note}
                onChange={onChangeNoteValue}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleTransfer}
                >
                    Transfer
                </Button>
            </div>
        );
    }
    else if(utilityType === "withdraw") {
        return (
            <div className={classes.flexContainer}> 
                <Typography variant="h6">
                    Withdraw
                </Typography>
                <Typography>
                    Amount you want to withdraw in USD (max $100,000)
                </Typography>
                <Typography>
                    {balanceError}
                </Typography>
                <Typography>
                    {depositError}
                </Typography>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="amount"
                label="Amount"
                type="amount"
                id="trans-amount"
                value={withdrawValue}
                onChange={onChangeWithdrawValue}
                />
                <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="note"
                label="Note"
                type="note"
                id="note"
                value={note}
                onChange={onChangeNoteValue}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleWithdraw}
                >
                    Withdraw
                </Button>
            </div>
        );
    }
    else if(utilityType === "summary"){
        let deposits = user.transactions.filter(transactions => transactions.type === 'Deposit');
        let withdraws = user.transactions.filter(transactions => transactions.type === 'Withdraw');
        let transfers = user.transactions.filter(transactions => transactions.type === 'Transfer');
        return (
            <div className={classes.flexGrid}>
                {/* <List>
                    {user.transactions.map((text, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={JSON.stringify(text)} />
                        </ListItem>  
                    ))}
                </List> */}
                <Typography>
                    Transfers
                </Typography>
                <Datagrid rows={transfers}/>

                <Typography>
                    Deposits
                </Typography>
                <Datagrid rows={deposits}/>

                <Typography>
                    Withdraws
                </Typography>
                <Datagrid rows={withdraws}/>
            </div>

        );
    }
    else {
        return (
            <div className={classes.flexContainer}> 
                
            </div>
        );
    }
    
}