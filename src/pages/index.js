import { useCallback, useEffect, useState } from "react";
// import Boat from "./boat";
import { Grid, Button, Box } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CloseIcon from "@mui/icons-material/Close";

import backgroundImg from "../assets/background.png";

import Scene from "./scene";
import { initState, modelParts } from "../constants/index";
import { findModelByID, getFirstRemoveArray } from "../utils";

export default function View() {
    const [state, setState] = useState(initState);
    const [currentDragItem, setCurrentDragItem] = useState({
        taskId: "",
        columnId: "",
    });

    const deleteConfiguration = useCallback(
        (clickID) => {
            const updatedColumns = {
                ...state.columns,
                "column-1": {
                    ...state.columns["column-1"],
                    taskIds: state.columns["column-1"].taskIds.filter(
                        (taskId) => taskId !== clickID
                    ),
                },
                "column-2": {
                    ...state.columns["column-2"],
                    taskIds: [...state.columns["column-2"].taskIds, clickID],
                },
            };

            const updatedData = {
                ...state,
                columns: updatedColumns,
            };
            setState({ ...updatedData });
        },
        [state]
    );

    const handleDragStart = useCallback(
        (start) => {
            setCurrentDragItem({
                taskId: start.draggableId,
                columnId: start.source.droppableId,
            });
            setState({
                ...state,
                homeIndex: state.columnOrder.indexOf(start.source.droppableId),
            });
        },
        [state]
    );

    const handleDragUpdate = useCallback((update) => {}, []);

    const handleDragEnd = useCallback(
        (result) => {
            setState({
                ...state,
                homeIndex: null,
            });

            if (!result.destination) {
                return;
            }

            if (
                result.destination.droppableId === result.source.droppableId &&
                result.destination.index === result.source.index
            ) {
                return;
            }
            const start = state.columns[result.source.droppableId];
            const finish = state.columns[result.destination.droppableId];

            if (start === finish) {
                const newTaskIds = Array.from(start.taskIds);
                newTaskIds.splice(result.source.index, 1);

                newTaskIds.splice(
                    result.destination.index,
                    0,
                    result.draggableId
                );

                const newColumn = {
                    ...start,
                    taskIds: newTaskIds,
                };
                const newColumns = {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                };
                setState({
                    ...state,
                    columns: newColumns,
                });
                return;
            }

            const startTaskIds = Array.from(start.taskIds);
            const finishTaskIds = Array.from(finish.taskIds);
            const startId = startTaskIds[result.source.index];

            if (start.id === "column-2") {
                exchange(startId, result.destination.index);
            } else {
                startTaskIds.splice(result.source.index, 1);
                const newStart = {
                    ...start,
                    taskIds: startTaskIds,
                };
                finishTaskIds.splice(
                    result.destination.index,
                    0,
                    result.draggableId
                );
                const newFinish = {
                    ...finish,
                    taskIds: finishTaskIds,
                };
                setState({
                    ...state,
                    columns: {
                        ...state.columns,
                        [newStart.id]: newStart,
                        [newFinish.id]: newFinish,
                    },
                });
            }
        },
        [state]
    );

    const exchange = (cid, dindex) => {
        const cindex = state.columns["column-2"].taskIds.findIndex(
            (id) => id === cid
        );
        const newColum2 = Array.from(state.columns["column-2"].taskIds);
        const newColum1 = Array.from(state.columns["column-1"].taskIds);

        newColum2.splice(cindex, 1);
        if (dindex) {
            newColum1.splice(dindex, 0, cid);
        } else {
            newColum1.push(cid);
        }

        const sameTypeId = newColum1.find(
            (id) => id.split("-")[0] === cid.split("-")[0] && cid !== id
        );
        if (sameTypeId) {
            const index = newColum1.findIndex((id) => id === sameTypeId);
            newColum1.splice(index, 1);
            newColum2.push(sameTypeId);
        }

        setState({
            ...state,
            columns: {
                ...state.columns,
                "column-1": {
                    id: "column-1",
                    taskIds: newColum1,
                },
                "column-2": {
                    id: "column-2",
                    taskIds: newColum2,
                },
            },
        });
    };

    return (
        <div>
            {
                <Grid
                    sx={{
                        backgroundImage: `url(${backgroundImg})`,
                        backgroundSize: "100% 100%",
                        minHeight: "100vh",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Grid container sx={{ height: "100vh" }}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Grid
                                sx={{
                                    position: "absolute",
                                    width: "100vw",
                                    height: "100vh",
                                    color: "white",
                                }}
                            >
                                <Scene
                                    state={state}
                                    deleteInventory={deleteConfiguration}
                                    exchange={exchange}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ padding: "16px" }}>
                                <Grid item lg={8} md={12} xs={12}>
                                    <Box
                                        as="p"
                                        m="0"
                                        style={{
                                            fontSize: "50px",
                                            color: "white",
                                        }}
                                    >
                                        Anytec 750 SPD
                                    </Box>
                                    <Box
                                        style={{ color: "white", width: "60%" }}
                                    >
                                        A leisure boat with professional boat
                                        standards for those with high demands.
                                        Designed for use in our Nordic waters in
                                        all weather conditions. Now better than
                                        ever before with a refined cockpit
                                        environment, a completely new canopy
                                        solution, and a multitude of updates
                                        from bow to stern.
                                    </Box>
                                </Grid>
                                <Grid />
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            md={4}
                            lg={3}
                            sx={{
                                zIndex: "100",
                                padding: "16px",
                                height: "fit-content",
                                zIndex: 200000000,
                            }}
                        >
                            <Grid container>
                                <DragDropContext
                                    onDragStart={handleDragStart}
                                    onDragUpdate={handleDragUpdate}
                                    onDragEnd={handleDragEnd}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        margin={"2%"}
                                        style={{
                                            backgroundColor: "#212121",
                                            padding: "3%",
                                            alignContent: "center",
                                            borderRadius: "20px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <Grid
                                            style={{
                                                color: "white",
                                                textAlign: "center",
                                                padding: "1%",
                                            }}
                                        >
                                            Current inventory
                                        </Grid>
                                        <Droppable
                                            droppableId={`${state.columnOrder[0]}`}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: `${
                                                            state.columns[
                                                                "column-1"
                                                            ].taskIds.length *
                                                                34 +
                                                            (state.columns[
                                                                "column-1"
                                                            ].taskIds.length -
                                                                1) *
                                                                10 +
                                                            (snapshot.isDraggingOver &&
                                                            currentDragItem.columnId !==
                                                                "column-1"
                                                                ? 44
                                                                : 0)
                                                        }px`,

                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "10px",
                                                    }}
                                                    className="column1_area"
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                >
                                                    {state.columns[
                                                        "column-1"
                                                    ].taskIds
                                                        .map(
                                                            (taskId) =>
                                                                state.tasks[
                                                                    taskId
                                                                ]
                                                        )
                                                        .map((task, index) => (
                                                            <Draggable
                                                                draggableId={
                                                                    task.id
                                                                }
                                                                index={index}
                                                                key={`${Date.now()}${index}`}
                                                            >
                                                                {(
                                                                    provided,
                                                                    snapshot
                                                                ) => (
                                                                    <Grid
                                                                        id={
                                                                            task.id
                                                                        }
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        {...provided.draggableProps}
                                                                    >
                                                                        <div
                                                                            {...provided.dragHandleProps}
                                                                            className={`draggable-item ${
                                                                                snapshot.isDragging
                                                                                    ? "black"
                                                                                    : ""
                                                                            }`}
                                                                        >
                                                                            <div>
                                                                                <Box
                                                                                    as="span"
                                                                                    color="white"
                                                                                >
                                                                                    {
                                                                                        task.content
                                                                                    }
                                                                                </Box>
                                                                                <CloseIcon
                                                                                    style={{
                                                                                        cursor: "pointer",
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        deleteConfiguration(
                                                                                            task.id
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                </div>
                                            )}
                                        </Droppable>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        display={"flex"}
                                        flexDirection={"column"}
                                        gap={"0.5rem"}
                                        padding={"2%"}
                                        margin={"2%"}
                                        style={{
                                            backgroundColor: "#212121",
                                            borderRadius: "20px",
                                        }}
                                    >
                                        <p
                                            style={{
                                                color: "white",
                                                textAlign: "center",
                                            }}
                                        >
                                            Possible inventory
                                        </p>
                                        <Droppable
                                            droppableId={`${state.columnOrder[1]}`}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: `${
                                                            state.columns[
                                                                "column-2"
                                                            ].taskIds.length *
                                                                34 +
                                                            (state.columns[
                                                                "column-2"
                                                            ].taskIds.length -
                                                                1) *
                                                                10 +
                                                            (snapshot.isDraggingOver &&
                                                            currentDragItem.columnId !==
                                                                "column-2"
                                                                ? 44
                                                                : 0)
                                                        }px`,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "10px",
                                                    }}
                                                    className="column2_area"
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                >
                                                    {state.columns[
                                                        "column-2"
                                                    ].taskIds
                                                        .map(
                                                            (taskId) =>
                                                                state.tasks[
                                                                    taskId
                                                                ]
                                                        )
                                                        .map((task, index) => (
                                                            <Draggable
                                                                draggableId={
                                                                    task.id
                                                                }
                                                                index={index}
                                                                key={`${Date.now()}${index}`}
                                                            >
                                                                {(
                                                                    provided,
                                                                    snapshot
                                                                ) => (
                                                                    <Grid
                                                                        style={{
                                                                            textAlign:
                                                                                "center",
                                                                        }}
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        {...provided.draggableProps}
                                                                    >
                                                                        <div
                                                                            {...provided.dragHandleProps}
                                                                            className={`draggable-item ${
                                                                                snapshot.isDragging
                                                                                    ? ""
                                                                                    : "black"
                                                                            }`}
                                                                        >
                                                                            <div>
                                                                                <Box
                                                                                    as="span"
                                                                                    color="white"
                                                                                >
                                                                                    {
                                                                                        task.content
                                                                                    }
                                                                                </Box>
                                                                                <CloseIcon />
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                </div>
                                            )}
                                        </Droppable>
                                    </Grid>
                                </DragDropContext>
                                <Grid
                                    item
                                    xs={12}
                                    margin={"2%"}
                                    sx={{
                                        backgroundColor: "#212121",
                                        padding: "3%",
                                        alignContent: "center",
                                        borderRadius: "20px",
                                    }}
                                >
                                    <p
                                        style={{
                                            textAlign: "center",
                                            color: "white",
                                        }}
                                    >
                                        Total: 143 000$
                                    </p>
                                    <Grid
                                        container
                                        columnSpacing={1}
                                        style={{
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Grid>
                                            <Button
                                                style={{
                                                    color: "white",
                                                    marginLeft: "15px",
                                                    borderRadius: "25px",
                                                    backgroundColor: "#ff9900",
                                                    ":hover": {
                                                        boxShadow: 4,
                                                        backgroundColor:
                                                            "#ffa31a",
                                                    },
                                                }}
                                            >
                                                <>SIMULATE</>
                                            </Button>
                                        </Grid>
                                        <Grid>
                                            <Button
                                                style={{
                                                    marginRight: "15px",
                                                    color: "white",
                                                    borderRadius: "25px",
                                                    backgroundColor: "#ff9900",
                                                    ":hover": {
                                                        boxShadow: 4,
                                                        backgroundColor:
                                                            "#ffa31a",
                                                    },
                                                }}
                                            >
                                                DEALERS
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </div>
    );
}
