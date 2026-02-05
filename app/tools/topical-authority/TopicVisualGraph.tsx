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
import { useTheme } from "next-themes";
import { useEffect } from "react";

interface TopicVisualGraphProps {
  initialNodes: any[];
  initialEdges: any[];
}

export default function TopicVisualGraph({
  initialNodes,
  initialEdges,
}: TopicVisualGraphProps) {
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || theme === "dark";

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync node styles with theme to ensure visibility
  useEffect(() => {
    setNodes(
      initialNodes.map((node) => ({
        ...node,
        style: {
          ...node.style,
          backgroundColor: isDark ? "#27272a" : "#ffffff", // zinc-800 or white
          color: isDark ? "#f4f4f5" : "#18181b", // zinc-100 or zinc-900
          border: `1px solid ${isDark ? "#3f3f46" : "#e4e4e7"}`, // zinc-700 or zinc-200
          fontWeight: 500,
          borderRadius: "8px",
          padding: "10px",
          fontSize: "12px",
          boxShadow: isDark
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
      })),
    );
  }, [isDark, initialNodes, setNodes]);

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
        className={`bg-slate-50 dark:bg-zinc-950 [&_.react-flow__pane]:cursor-default 
          [&_.react-flow__controls-button]:!bg-white dark:[&_.react-flow__controls-button]:!bg-white
          [&_.react-flow__controls-button]:!border-zinc-200
          [&_.react-flow__controls-button_svg]:!fill-zinc-900
          [&_.react-flow__controls-button:hover]:!bg-zinc-100`}
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
          className="!bg-white !border-zinc-200 !shadow-lg !rounded-lg !overflow-hidden !border"
          showInteractive={false}
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.5}
          color={isDark ? "#10B981" : "#a7f3d0"}
          className="opacity-[0.15]"
        />
      </ReactFlow>
    </div>
  );
}
