import React from "react";
import styled from "styled-components";

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xxl};
  text-align: center;
  color: ${(props) => props.theme.colors.secondary};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  margin-bottom: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.dark};
`;

const EmptyState: React.FC<{
  title: string;
  description: string;
  action?: React.ReactNode;
}> = ({ title, description, action }) => (
  <EmptyContainer>
    <EmptyIcon>📝</EmptyIcon>
    <EmptyTitle>{title}</EmptyTitle>
    <p>{description}</p>
    {action && <div style={{ marginTop: "16px" }}>{action}</div>}
  </EmptyContainer>
);

export default EmptyState;
