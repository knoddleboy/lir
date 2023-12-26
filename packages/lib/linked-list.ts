// /**
//  * Represents a node in a linked list.
//  *
//  * @template T The type of the data stored in the node.
//  * @property data The data stored in the node.
//  * @property nextId The ID of the next node in the list. Can be null if there is no next element.
//  */
// class ListNode<T> {
//   constructor(
//     public data: T,
//     public nextId?: string | null
//   ) {}
// }

// /**
//  * This is an implementation of a (singly) linked list.
//  * A linked list is a data structure that stores each element with a pointer (or reference) to the next element
//  * in the list. Therefore, it is a linear data structure, which can be resized dynamically during runtime, as there is
//  * no fixed memory block allocated.
//  *
//  * @template T The type of the value of the nodes.
//  * @property head The head of the list.
//  * @property length The length of the list.
//  */
// export class SinglyLinkedList<T> {
//   private head?: ListNode<T>;
//   private length: number;

//   /**
//    * Creates a new, empty linked list.
//    */
//   constructor() {
//     this.head = undefined;
//     this.length = 0;
//   }

//   /**
//    * Checks if the list is empty.
//    *
//    * @returns Whether the list is empty or not.
//    */
//   isEmpty(): boolean {
//     return !this.head;
//   }

//   /**
//    * Gets the data of the node at the given index.
//    * Time complexity: linear (O(n))
//    *
//    * @param index The index of the node.
//    * @returns The data of the node at the given index or null, if no data is present.
//    */
//   get(index: number): T | null {
//     if (index < 0 || index >= this.length) {
//       return null;
//     }

//     if (this.isEmpty()) {
//       return null;
//     }

//     let currentNode: ListNode<T> | undefined = this.head;
//     for (let i: number = 0; i < index; i++) {
//       if (!currentNode || !currentNode.nextId) {
//         return null;
//       }

//       const nextNode = fetchBlockById(currentNode.nextId);
//       if (!nextNode) {
//         return null;
//       }

//       currentNode = new ListNode(nextNode.data, nextNode.nextId);
//     }

//     return currentNode!.data;
//   }

//   /**
//    * Inserts the given data as the first node of the list.
//    * Time complexity: constant (O(1))
//    *
//    * @param data The data to be inserted.
//    */
//   push(data: T): void {
//     const node: ListNode<T> = new ListNode<T>(data);

//     if (this.isEmpty()) {
//       this.head = node;
//     } else {
//       node.nextId = this.head?.nextId;
//       this.head = node;
//     }

//     this.length++;
//   }

//   /**
//    * Removes the first node of the list.
//    * Time complexity: constant (O(1))
//    *
//    * @returns The data of the node that was removed.
//    * @throws Index out of bounds if the list is empty.
//    */
//   pop(): T {
//     if (this.isEmpty()) {
//       throw new Error("Index out of bounds");
//     }

//     const node: ListNode<T> = this.head!;
//     this.head = this.head!.nextId
//       ? new ListNode<T>(fetchBlockById(this.head!.nextId)!.data, this.head!.nextId)
//       : undefined;
//     this.length--;

//     return node.data;
//   }

//   /**
//    * Inserts the given data as a new node after the current TAIL.
//    * Time complexity: constant (O(1))
//    *
//    * @param data The data of the node being inserted.
//    */
//   append(data: T): void {
//     const node: ListNode<T> = new ListNode<T>(data);

//     if (this.isEmpty()) {
//       this.head = node;
//     } else {
//       let currentNode: ListNode<T> = this.head!;
//       while (currentNode!.nextId) {
//         currentNode = new ListNode<T>(
//           fetchBlockById(currentNode.nextId)!.data,
//           currentNode.nextId
//         );
//       }

//       currentNode.nextId = node.data;
//     }

//     this.length++;
//   }

//   /**
//    * Removes the current TAIL of the list.
//    * Time complexity: linear (O(n))
//    *
//    * @returns The data of the former TAIL.
//    * @throws Index out of bounds if the list is empty.
//    */
//   removeTail(): T {
//     if (!this.head) {
//       throw new Error("Index out of bounds");
//     }

//     const currentTailId = this.findTailId();
//     const currentTailData = fetchBlockById(currentTailId!)!.data;

//     if (this.head.nextId === currentTailId) {
//       this.head.nextId = null;
//     } else {
//       let currentNode: ListNode<T> = this.head!;
//       while (currentNode!.nextId !== currentTailId) {
//         currentNode = new ListNode<T>(
//           fetchBlockById(currentNode.nextId)!.data,
//           currentNode.nextId
//         );
//       }

//       currentNode!.nextId = null;
//     }

//     this.length--;

//     return currentTailData;
//   }

//   /**
//    * Inserts the data as a new node at the given index.
//    * Time complexity: O(n)
//    *
//    * @param index The index where the node is to be inserted.
//    * @param data The data to insert.
//    * @throws Index out of bounds, when given an invalid index.
//    */
//   insertAt(parentId: string, data: T): void {
//     const newNode = new ListNode<T>(data);
//     const parentNode = fetchBlockById(parentId);

//     if (!parentNode) {
//       throw new Error("Parent node not found");
//     }

//     newNode.nextId = parentNode.nextId;
//     parentNode.nextId = newNode.data;

//     this.length++;
//   }

//   /**
//    * Removes the node at the given index.
//    * Time complexity: O(n)
//    *
//    * @param index The index of the node to be removed.
//    * @returns The data of the removed node.
//    * @throws Index out of bounds, when given an invalid index.
//    */
//   removeAt(index: number): T {
//     if (index < 0 || index >= this.length) {
//       throw new Error("Index out of bounds");
//     }

//     if (index === 0) {
//       return this.pop();
//     }

//     if (index === this.length - 1) {
//       return this.removeTail();
//     }

//     let previousNode: ListNode<T> | undefined;
//     let currentNode: ListNode<T> | undefined = this.head;
//     for (let i: number = 0; i < index; i++) {
//       if (i === index - 1) {
//         previousNode = currentNode;
//       }

//       currentNode = currentNode?.nextId
//         ? new ListNode<T>(
//             fetchBlockById(currentNode.nextId)!.data,
//             currentNode.nextId
//           )
//         : undefined;
//     }

//     previousNode!.nextId = currentNode?.nextId;
//     this.length--;

//     return currentNode!.data;
//   }

//   /**
//    * Clears the list.
//    */
//   clear(): void {
//     this.head = undefined;
//     this.length = 0;
//   }

//   /**
//    * Converts the list to an array.
//    *
//    * @returns The array representation of the list.
//    */
//   toArray(): T[] {
//     const array: T[] = [];
//     let currentNode: ListNode<T> | undefined = this.head;

//     while (currentNode) {
//       array.push(currentNode.data);

//       if (currentNode.nextId) {
//         currentNode = new ListNode<T>(
//           fetchBlockById(currentNode.nextId)!.data,
//           currentNode.nextId
//         );
//       } else {
//         currentNode = undefined;
//       }
//     }

//     return array;
//   }

//   /**
//    * Gets the length of the list.
//    *
//    * @returns The length of the list.
//    */
//   getLength(): number {
//     return this.length;
//   }

//   /**
//    * Finds the ID of the current tail node.
//    *
//    * @returns The ID of the tail node or null if the list is empty.
//    */
//   private findTailId(): string | null {
//     if (!this.head) {
//       return null;
//     }

//     let currentNode: ListNode<T> | undefined = this.head;
//     while (currentNode!.nextId) {
//       currentNode = new ListNode<T>(
//         fetchBlockById(currentNode.nextId)!.data,
//         currentNode.nextId
//       );
//     }

//     return currentNode!.data;
//   }
// }

// // Function to fetch a Block by ID from the database
// function fetchBlockById(id: string): { data: any; nextId: string | null } | null {
//   // Implement your logic to retrieve a Block by ID from the database
//   // and return an object with the data and nextId
//   // If the block is not found, return null
//   // Example: const block = await prisma.block.findUnique({ where: { id } });
//   //          return block ? { data: block, nextId: block.nextId } : null;
//   return null; // Replace with your actual implementation
// }
