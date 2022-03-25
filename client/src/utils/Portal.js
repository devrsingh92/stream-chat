import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// Utils //

function getContainer(container, defaultContainer) {
    container = typeof container === 'function' ? container() : container;
    return ReactDOM.findDOMNode(container) || defaultContainer;
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
class Portal extends React.Component {
    componentDidMount() {
        this.setMountNode(this.props.container);

        // Only rerender if needed
        if (!this.props.disable) {
            this.forceUpdate(this.props.onRendered);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.container !== this.props.container || prevProps.disable !== this.props.disable) {
            this.setMountNode(this.props.container);

            // Only rerender if needed
            if (!this.props.disable) {
                this.forceUpdate(this.props.onRendered);
            }
        }
    }

    componentWillUnmount() {
        this.mountNode = null;
    }

    setMountNode(container) {
        if (this.props.disable) {
            this.mountNode = ReactDOM.findDOMNode(this).parentElement;
            return;
        }

        this.mountNode = getContainer(container, document.body);
    }

    getMountNode = () => {
        return this.mountNode;
    };

    render() {
        const { children, disable, unmount } = this.props;

        if (unmount) {
            return null;
        }

        if (disable) {
            return children;
        }

        return this.mountNode ? ReactDOM.createPortal(children, this.mountNode) : null;
    }
}

Portal.propTypes = {
    children: PropTypes.node.isRequired,
    container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    disable: PropTypes.bool,
    onRendered: PropTypes.func,
    unmount: PropTypes.bool,
};

Portal.defaultProps = {
    disable: false,
};

export default Portal;
