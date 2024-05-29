import { Timeline, TimelineState,  } from "@xzdarcy/react-timeline-editor";
import { cloneDeep } from "lodash";
import React, { useRef, useState, useEffect } from "react";
import { CustomRender0, CustomRender1 } from "./custom";
import {
  CustomTimelineAction,
  CusTomTimelineRow,
  mockData,
  mockEffect,
  scale,
  scaleWidth,
  startLeft,
} from "./mock";
import TimelinePlayer from "./player";
import { useTheme } from 'next-themes';

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);
  const timelineState = useRef<TimelineState>();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // const playerPanel = useRef<HTMLDivElement>();
  const autoScrollWhenPlay = useRef<boolean>(true);

  return (
    <div className='timeline-editor-engine scrollbar-webkit'>
      {/* <div className="player-config">
       
      </div> */}

      {/* videonya disini */}
      {/* <div className="player-panel" id="player-ground-1" ref={playerPanel}></div> */}

      <TimelinePlayer
        timelineState={timelineState}
        autoScrollWhenPlay={autoScrollWhenPlay}
      />
      <Timeline
        style={{
          display: "flex",
          backgroundColor: theme === 'dark' ? '#2B2C2B' : '#fff',
          border: theme === 'dark' ? '1px solid #e2e8f0' : '1px solid #e2e8f0',
          borderRadius: "4px",
          color: theme === 'dark' ? '#fff' : '#333333',
        }}
        scale={scale}
        scaleWidth={scaleWidth}
        startLeft={startLeft}
        autoScroll={true}
        ref={timelineState}
        editorData={data}
        effects={mockEffect}
        onChange={(data) => {
          setData(data as CusTomTimelineRow[]);
        }}
        getActionRender={(action, row) => {
          if (action.effectId === "effect0") {
            return (
              <CustomRender0
                action={action as CustomTimelineAction}
                row={row as CusTomTimelineRow}
              />
            );
          } else if (action.effectId === "effect1") {
            return (
              <CustomRender1
                action={action as CustomTimelineAction}
                row={row as CusTomTimelineRow}
              />
            );
          }
        }}
      />
    </div>
  );
};

export default TimelineEditor;
