import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import SongCard from './songCard';
import { reorderSongs } from '../../actions/playlistActions';

const mapStateToProps = state => ({
    form: state.form
});

const style = {
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move'
};

const songSource = {
    beginDrag (props) {
        return {
            id: props.id,
            originalIndex: props.findSong(props.id).index
        };
    },
    endDrag (props, monitor) {
        const newIndex = props.index;
        const { id: draggedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();

        // If drop was cancelled, move it back
        if (!didDrop) {
            props.moveSong(draggedId, originalIndex);
        }

        props.dispatch(reorderSongs({ id: draggedId, index: newIndex }));
    }
};

const songTarget = {
    drop (props, monitor) {
        return monitor.getItem();
    },
    hover (props, monitor, component) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;
        // only replace items if they're different
        if (draggedId !== overId) {
            const { index: dragIndex } = props.findSong(draggedId);
            const { index: hoverIndex } = props.findSong(overId);
            // Determine rectangle on screen
            const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

            // Get horizontal middle
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the left
            const hoverClientX = clientOffset.x - hoverBoundingRect.left;

            // Only perform the move when the mouse has crossed half of the items width
            // When dragging rightwards, only move when the cursor is after 50%
            // When dragging leftwards, only move when the cursor is before 50%

            const isDraggingRightwards = dragIndex < hoverIndex;
            const isHoverBeforeMiddle = hoverClientX < hoverMiddleX;
            const isDraggingLeftwards = dragIndex > hoverIndex;
            const isHoverAfterMiddle = hoverClientX > hoverMiddleX;

            if ((isDraggingRightwards && isHoverAfterMiddle) ||
                (isDraggingLeftwards && isHoverBeforeMiddle)) {
              // Time to actually perform the action
                props.moveSong(draggedId, hoverIndex);
            }
        }
    }
};

const type = {
    SONG: 'song'
};

const collectDragSource = (dndConnect, monitor) => ({
    connectDragSource: dndConnect.dragSource(),
    isDragging: monitor.isDragging()
});

const collectDropTarget = dndConnect => ({
    connectDropTarget: dndConnect.dropTarget()
});

class SongFormWrapper extends Component {
    render () {
        const {
            isDragging,
            connectDragSource,
            connectDropTarget
        } = this.props;

        const opacity = isDragging ? 0 : 1;

        return connectDragSource(connectDropTarget(
            <div
                className="song-item"
                style={{ ...style, opacity }}
            >
                <SongCard {...this.props} />
            </div>
        ));
    }
}

SongFormWrapper.propTypes = {
    isDragging: PropTypes.bool,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func
};

SongFormWrapper = DropTarget(type.SONG, songTarget, collectDropTarget)(SongFormWrapper);
export default compose(connect(mapStateToProps),
    DragSource(type.SONG, songSource, collectDragSource))(SongFormWrapper);
