import * as React from 'react';
import classnames from 'classnames';
import './Icon.less';

export interface IconProps {
  className?: string;
  type: string;
  color?: string;
  fontSize?: string | number;
  style?: React.CSSProperties;
  onClick?: (e: any) => void;
}

export default class Icon extends React.Component<IconProps, any> {
  static defaultProps = {
    style: {},
    dot: false,
  };

  render() {
    const { type, className, color, fontSize, style, onClick } = this.props;
    const cls = classnames(
      className,
      'icon',
      'iconfont',
      'fm-icon',
      `fm-icon-${type}`,
    );
    const formatStyle = { ...style };
    if (color) {
      Object.assign(formatStyle, { color });
    }
    if (fontSize) {
      Object.assign(formatStyle, {
        fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
      });
    }
    return <i className={cls} style={formatStyle} onClick={onClick} />;
  }
}
