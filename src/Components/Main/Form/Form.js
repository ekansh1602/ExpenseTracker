import React, { useState, useContext, useEffect } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import useStyles from './styles';
import { v4 as uuidv4 } from 'uuid';
import { ExpenseTrackerContext } from '../../../Context/Context';
import { incomeCategories, expenseCategories } from '../../../Constants/Categories';
import { useSpeechContext } from '@speechly/react-client';
import CustomizedSnackbar from '../../Snackbar/Snackbar';



const initalState = {
    amount: '',
    category: '',
    type: '',
    date: new Date(),
};

const Form = () => {

    const classes = useStyles();
    const [formData,setFormData] = useState(initalState);
    const { addTransaction } = useContext(ExpenseTrackerContext);
    const { segment } = useSpeechContext();
    const [open,setOpen] = useState(false);

    const createTransaction = () => {
        if(Number.isNaN(Number(formData.amount))){
            return;
        }
        const transaction = {...formData, amount: Number(formData.amount), id: uuidv4()}
        setOpen(true);
        addTransaction(transaction);
        setFormData(initalState);
    }

    useEffect(() => {
        if(segment){
            if(segment.intent.intent === 'add_expense'){
                setFormData({...formData, type: 'Expense'});
            }
            else if(segment.intent.intent === 'add_income'){
                setFormData({...formData, type: 'Income'});
            }
            else if(segment.isFinal && segment.intent.intent === 'create_transaction'){
                return createTransaction();
            }
            else if(segment.isFinal && segment.intent.intent === 'cancel_transaction'){
                return setFormData(initalState);
            }

            segment.entities.forEach((e) => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`

                switch (e.type) {
                    case 'amount':
                        setFormData({...formData, amount: e.value});
                        break;
                    case 'category':
                        if(incomeCategories.map((i) => i.type).includes(category)){
                            setFormData({...formData, type: 'Income', category: category});
                        }
                        else if(expenseCategories.map((e) => e.type).includes(category)){
                            setFormData({...formData, type: 'Expense', category: category});
                        }
                        break;
                    case 'date':
                        setFormData({...formData, date: e.value});
                        break;
                    default:
                        break;
                }
            });

            if(segment.isFinal && formData.amount && formData.category && formData.type && formData.date){
                createTransaction();
            }
        }
    }, [segment]);

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    //console.log(formData);

    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen}/>
            <Grid item xs={12}>
                <Typography variant="subtitle2" align="center" gutterBottom>
                    {/*Here words that we speak in speechly would appear*/}
                    {
                        segment && (
                            <>
                            {segment.words.map((word) => word.value).join(' ')}
                            </>
                        )
                    }
                    </Typography>
            </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                                <MenuItem value="Income">Income</MenuItem>
                                <MenuItem value="Expense">Expense</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                {
                                    selectedCategories.map((category) => {
                                        return(
                                        <MenuItem value={category.type} key={category.type}>{category.type}</MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})}/>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField type="date" label=" " fullWidth value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}/>
                    </Grid>
                    <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default Form
