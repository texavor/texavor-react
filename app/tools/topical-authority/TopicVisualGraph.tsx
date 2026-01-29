"use client";

import React, { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface TopicVisualGraphProps {
  initialNodes: any[];
  initialEdges: any[];
}

export default function TopicVisualGraph({
  initialNodes,
  initialEdges,
}: TopicVisualGraphProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="h-[500px] w-full border-none rounded-xl overflow-hidden bg-slate-50 dark:bg-zinc-900/50 shadow-inner ring-1 ring-border/50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-slate-50 dark:bg-zinc-950 [&_.react-flow__pane]:cursor-default [&_.react-flow__pane]:!text-black"
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          style: { stroke: "#10B981", strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#10B981",
          },
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Controls
          className="bg-white dark:bg-zinc-800 border-border"
          showInteractive={false}
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          color="#a7f3d0"
          className="opacity-50"
        />
      </ReactFlow>
    </div>
  );
}
