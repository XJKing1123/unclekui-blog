export default function stripLeadingTitle() {
  return (tree) => {
    const index = tree.children.findIndex((node) => node.type !== 'yaml');
    if (index >= 0 && tree.children[index]?.type === 'heading' && tree.children[index].depth === 1) {
      tree.children.splice(index, 1);
    }
  };
}
