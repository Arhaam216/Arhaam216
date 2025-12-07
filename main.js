import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.180.0/three.module.min.js';

Ammo().then(function (Ammo) {
    // Physics world
    const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    const overlappingPairCache = new Ammo.btDbvtBroadphase();
    const solver = new Ammo.btSequentialImpulseConstraintSolver();
    const physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
    physicsWorld.setGravity(new Ammo.btVector3(0, -9.82, 0));

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f0f);

    // Camera
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;
    camera.position.y = 2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(2, 2, 5);
    scene.add(directionalLight);

    // Bookshelf
    const bookshelf = new THREE.Group();
    scene.add(bookshelf);
    const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown color

    function createShelf(position, size) {
        const shape = new THREE.BoxGeometry(size.x, size.y, size.z);
        const mesh = new THREE.Mesh(shape, shelfMaterial);
        mesh.position.copy(position);
        bookshelf.add(mesh);

        const transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z));
        const motionState = new Ammo.btDefaultMotionState(transform);
        const colShape = new Ammo.btBoxShape(new Ammo.btVector3(size.x * 0.5, size.y * 0.5, size.z * 0.5));
        const localInertia = new Ammo.btVector3(0, 0, 0);
        const rbInfo = new Ammo.btRigidBodyConstructionInfo(0, motionState, colShape, localInertia);
        const body = new Ammo.btRigidBody(rbInfo);
        physicsWorld.addRigidBody(body);
    }

    // Shelves
    createShelf(new THREE.Vector3(0, -2.25, 0), new THREE.Vector3(4, 0.1, 1));
    createShelf(new THREE.Vector3(0, -0.75, 0), new THREE.Vector3(4, 0.1, 1));
    createShelf(new THREE.Vector3(0, 0.75, 0), new THREE.Vector3(4, 0.1, 1));
    createShelf(new THREE.Vector3(0, 2.25, 0), new THREE.Vector3(4, 0.1, 1));

    // Sides
    createShelf(new THREE.Vector3(-2, 0, 0), new THREE.Vector3(0.1, 4.5, 1));
    createShelf(new THREE.Vector3(2, 0, 0), new THREE.Vector3(0.1, 4.5, 1));

    // Book
    const bookSize = {x: 0.5, y: 1, z: 0.2};
    const bookPosition = {x: 0, y: 4, z: 0};
    const bookGeometry = new THREE.BoxGeometry(bookSize.x, bookSize.y, bookSize.z);
    const bookMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const book = new THREE.Mesh(bookGeometry, bookMaterial);
    book.position.set(bookPosition.x, bookPosition.y, bookPosition.z);
    scene.add(book);

    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(bookPosition.x, bookPosition.y, bookPosition.z));
    const motionState = new Ammo.btDefaultMotionState(transform);
    const colShape = new Ammo.btBoxShape(new Ammo.btVector3(bookSize.x * 0.5, bookSize.y * 0.5, bookSize.z * 0.5));
    const localInertia = new Ammo.btVector3(0, 0, 0);
    colShape.calculateLocalInertia(1, localInertia);
    const rbInfo = new Ammo.btRigidBodyConstructionInfo(1, motionState, colShape, localInertia);
    const body = new Ammo.btRigidBody(rbInfo);
    physicsWorld.addRigidBody(body);

    // Handle window resizing
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();

    // Animation loop
    function animate() {
        requestAnimationFrame( animate );

        const deltaTime = clock.getDelta();
        physicsWorld.stepSimulation(deltaTime, 10);

        const trans = new Ammo.btTransform();
        body.getMotionState().getWorldTransform(trans);
        const pos = trans.getOrigin();
        const quat = trans.getRotation();
        book.position.set(pos.x(), pos.y(), pos.z());
        book.quaternion.set(quat.x(), quat.y(), quat.z(), quat.w());

        renderer.render( scene, camera );
    }

    animate();
});
