import {makeStyles} from "@material-ui/core/styles";

export default makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(5),
    },
    leftIcon: {
        marginRight: theme.spacing(1)
    },
    rightIcon: {
        marginLeft: theme.spacing(1)
    },
    iconSmall: {
        fontSize: 20
    },
    root: {
        marginTop: theme.spacing(7),
        padding: theme.spacing(3, 2),
        width: 'min-content',
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        margin: theme.spacing(2,1,1,1),
        width: 400
    },
    row: {
        width: 400,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowItem: {
        flex: 1,
        width: 'auth'
    },
    textFieldRow: {
        margin: theme.spacing(2,0,1,1),
    }
}));