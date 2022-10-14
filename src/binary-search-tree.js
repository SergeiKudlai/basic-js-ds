const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootStart = null;
  }

  root() {
    return this.rootStart;
  }

  add(data) {
    this.rootStart = addWithin(this.rootStart, data);

    function addWithin(node, data) {
      if (!node) return new Node(data);
      if (node.data === data) return node;
      data < node.data ? node.left = addWithin(node.left, data) : node.right = addWithin(node.right, data);
      return node;
    }
  }

  has(data) {
    function searchWithin(node, data) {
      if (!node) return false;
      if (node.data === data) return true;
      return data < node.data ? searchWithin(node.left, data) : searchWithin(node.right, data);
    }
    return searchWithin(this.rootStart, data);
  }

  find(data) {
    function searchWithin(node, data) {
      if (!node) return null;
      if (node.data === data) return node;
      return data < node.data ? searchWithin(node.left, data) : searchWithin(node.right, data);
    }
    return searchWithin(this.rootStart, data);
  }

  remove(data) {
    this.rootStart = removeNode(this.rootStart, data);

    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {

        if (!node.left && !node.right) return null;

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;

        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }

        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootStart) return;
    let node = this.rootStart;

    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.rootStart) return;

    let node = this.rootStart;

    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}


module.exports = {
  BinarySearchTree
};