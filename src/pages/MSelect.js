import { useState } from "react";
import { IconButton, Box, Grid, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { initState } from "../constants";

const MSelect = (props) => {
    const [visible, setVisible] = useState(false);
    const { dir = "row-reverse", list, deleteInventory, exchange } = props;

    const toggleSlide = () => {
        setVisible(!visible);
    };

    return (
        <Box
            width="max-content"
            position="absolute"
            height="max-content"
            {...props}
        >
            <Box
                display="flex"
                alignItems={"flex-start"}
                flexDirection={dir}
                gap="10px"
            >
                <Box
                    m="0"
                    p="5px 15px"
                    letterSpacing={"1px"}
                    fontSize={"16px"}
                    backgroundColor="rgba(0,0,0,0.6)"
                    borderRadius="5px"
                    minWidth="215px"
                >
                    {initState.tasks[list[0]].content}
                </Box>
                <IconButton
                    style={{
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        borderRadius: "5px",
                        padding: `2px 5px ${visible ? "10px" : "5px"}`,
                    }}
                    aria-label="add an alarm"
                    onClick={() => toggleSlide()}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </Box>
            <Box
                position="absolute"
                width="100%"
                height={!visible ? "0" : "auto"}
                overflow={"hidden"}
                fontSize={"14px"}
                backgroundColor="rgba(0,0,0,0.6)"
                borderRadius="5px"
                top="35px"
                sx={{ transition: "0.2s" }}
            >
                <Grid
                    style={{
                        textAlign: "center",
                        width: "90%",
                        margin: "auto",
                        marginBlock: "15px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    {list.length > 0 &&
                        list.map((item, index) => (
                            <Button
                                endIcon={
                                    !index && (
                                        <CloseIcon
                                            onClick={(e) => {
                                                deleteInventory(item);
                                            }}
                                        />
                                    )
                                }
                                sx={{
                                    width: "100%",
                                    justifyContent: "space-between",
                                    borderRadius: "25px",
                                    backgroundColor: !index
                                        ? "#ff9900"
                                        : "black",
                                    fontSize: "14px",
                                    padding: "0 10px",
                                    ":hover": {
                                        boxShadow: 6,
                                        backgroundColor: "#ffa31a",
                                    },
                                }}
                                key={`${index}item`}
                            >
                                <Box
                                    as="span"
                                    width="100%"
                                    onClick={() => {
                                        index && exchange(item);
                                    }}
                                    className="select_model"
                                    datatexture={item.texture}
                                    dataindex="normalTexture"
                                    color="white"
                                >
                                    {initState.tasks[item].content}
                                </Box>
                            </Button>
                        ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default MSelect;
