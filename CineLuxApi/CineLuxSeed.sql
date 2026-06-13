-- CineLux Database Seed Script (MS SQL / SQL Server)
-- This script inserts initial seed data including plans, media items (movies and shows),
-- users, active subscriptions, and payment records.
-- Use this script to initialize the CineLux database.

-- Disable foreign key check or delete in dependency order
BEGIN TRANSACTION;

BEGIN TRY
    -- 1. Clean existing records in correct order to avoid constraint violations
    DELETE FROM [Payments];
    DELETE FROM [UserSubscriptions];
    DELETE FROM [Users];
    DELETE FROM [SubscriptionPlan];
    DELETE FROM [MediaItems];

    ---------------------------------------------------------
    -- 2. Seed [SubscriptionPlan] Table
    ---------------------------------------------------------
    SET IDENTITY_INSERT [SubscriptionPlan] ON;

    -- Monthly Plans
    INSERT INTO [SubscriptionPlan] (
        [PlanId], [PlanCode], [PlanName], [BillingInterval], 
        [PriceAmount], [CurrencyCode], [MaxStreams], [VideoQuality], 
        [IsActive], [CreatedAt]
    ) VALUES 
    (1, 'basic_monthly', 'Basic Monthly', 'monthly', 7.99, 'USD', 1, 'SD', 1, GETDATE()),
    (2, 'standard_monthly', 'Standard Monthly', 'monthly', 12.99, 'USD', 2, 'HD', 1, GETDATE()),
    (3, 'premium_monthly', 'Premium Monthly', 'monthly', 17.99, 'USD', 4, 'UHD', 1, GETDATE());

    -- Yearly Plans
    INSERT INTO [SubscriptionPlan] (
        [PlanId], [PlanCode], [PlanName], [BillingInterval], 
        [PriceAmount], [CurrencyCode], [MaxStreams], [VideoQuality], 
        [IsActive], [CreatedAt]
    ) VALUES 
    (4, 'basic_yearly', 'Basic Yearly', 'yearly', 79.99, 'USD', 1, 'SD', 1, GETDATE()),
    (5, 'standard_yearly', 'Standard Yearly', 'yearly', 129.99, 'USD', 2, 'HD', 1, GETDATE()),
    (6, 'premium_yearly', 'Premium Yearly', 'yearly', 179.99, 'USD', 4, 'UHD', 1, GETDATE());

    SET IDENTITY_INSERT [SubscriptionPlan] OFF;

    ---------------------------------------------------------
    -- 3. Seed [MediaItems] Table
    ---------------------------------------------------------
    SET IDENTITY_INSERT [MediaItems] ON;

    -- Media Items from frontend/public/videos & thumbnail
    INSERT INTO [MediaItems] (
        [MediaId], [Title], [MediaType], [Synopsis], [Genre], 
        [ReleaseDate], [RuntimeMinutes], [IsFree], 
        [PosterUrl], [TrailerUrl], [StreamUrl], 
        [AverageRating], [TotalViews], [CreatedAt], [UpdatedAt]
    ) VALUES
    (
        1, 
        'The Batman', 
        'movie', 
        'Batman is called to intervene when the mayor of Gotham City is murdered. Soon, his investigation leads him to uncover a web of corruption, linked to his own dark past.', 
        'Action, Drama, Crime', 
        '2022-03-04', 
        176, 
        0, 
        'thumbnail/The Batman.jpg', 
        'videos/THE BATMAN – Trailer.mp4', 
        'videos/THE BATMAN – Trailer.mp4', 
        4.8, 
        2450000, 
        GETDATE(), 
        GETDATE()
    ),
    (
        2, 
        'Dune: Part Two', 
        'movie', 
        'Paul Atreides unites with the Fremen while seeking vengeance against those who destroyed his family, balancing destiny, loyalty, and the fate of Arrakis.', 
        'Sci-Fi, Adventure', 
        '2024-03-01', 
        166, 
        0, 
        'thumbnail/Dune.jpg', 
        'videos/Dune.mp4', 
        'videos/Dune.mp4', 
        4.9, 
        3820000, 
        GETDATE(), 
        GETDATE()
    ),
    (
        3, 
        'Oppenheimer', 
        'movie', 
        'The story of J. Robert Oppenheimer and the creation of the atomic bomb unfolds as a high-stakes portrait of ambition, politics, and moral consequence.', 
        'History, Drama, Thriller', 
        '2023-07-21', 
        180, 
        0, 
        'thumbnail/Oppen Heimer.jpg', 
        'videos/Oppenheimer.mp4', 
        'videos/Oppenheimer.mp4', 
        4.9, 
        4120000, 
        GETDATE(), 
        GETDATE()
    ),
    (
        4, 
        'John Wick: Chapter 4', 
        'movie', 
        'John Wick discovers a path to defeat The High Table, but before earning his freedom he must face new enemies and old ghosts in a global showdown.', 
        'Action, Crime, Thriller', 
        '2023-03-24', 
        169, 
        0, 
        'thumbnail/John Wick.jpg', 
        'videos/John Wick.mp4', 
        'videos/John Wick.mp4', 
        4.7, 
        2950000, 
        GETDATE(), 
        GETDATE()
    ),
    (
        5, 
        'Spider-Man: Across the Spider-Verse', 
        'movie', 
        'Miles Morales catapults across dimensions and collides with a team of Spider-People who must redefine what heroism means when every universe is at risk.', 
        'Animation, Action, Adventure', 
        '2023-06-02', 
        140, 
        0, 
        'thumbnail/SpiderMan.jpg', 
        'videos/Spider-Man.mp4', 
        'videos/Spider-Man.mp4', 
        4.8, 
        3410000, 
        GETDATE(), 
        GETDATE()
    ),
    (
        6, 
        'Enola Holmes 2', 
        'movie', 
        'Now a detective-for-hire like her infamous brother, Enola Holmes takes on her first official case to find a missing girl, as the sparks of a dangerous conspiracy ignite a mystery.', 
        'Adventure, Mystery, Crime', 
        '2022-11-04', 
        129, 
        1, 
        'thumbnail/Enola Holmes 2.jpg', 
        'videos/Enola Holmes 2.mp4', 
        'videos/Enola Holmes 2.mp4', 
        4.2, 
        1850000, 
        GETDATE(), 
        GETDATE()
    ),
    (
        7, 
        'Satan''s Slaves', 
        'movie', 
        'After dying from a mysterious illness that she suffered for 3 years, a mother returns to her family home to haunt and terrorize her husband and four children.', 
        'Horror, Mystery, Thriller', 
        '2017-09-28', 
        107, 
        1, 
        'thumbnail/Satan''s Slaves .jpg', 
        'videos/SATAN''S SLAVES.mp4', 
        'videos/SATAN''S SLAVES.mp4', 
        4.0, 
        1200000, 
        GETDATE(), 
        GETDATE()
    ),
    (
        8, 
        'The Flash', 
        'movie', 
        'Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world without superheroes, forcing him to race for his life in order to save the future.', 
        'Action, Adventure, Sci-Fi', 
        '2023-06-16', 
        144, 
        0, 
        'thumbnail/The Flash.jpg', 
        'videos/The Flash.mp4', 
        'videos/The Flash.mp4', 
        4.1, 
        2100000, 
        GETDATE(), 
        GETDATE()
    ),
    (
        9, 
        'Weak Hero Class 2', 
        'series', 
        'A model student who uses his brain, tools, and psychology to fight back against the violence that takes place inside and outside of school.', 
        'Action, Drama, Youth', 
        '2024-12-15', 
        45, 
        0, 
        'thumbnail/Weak Hero.jpg', 
        'videos/Weak Hero Class 2.mp4', 
        'videos/Weak Hero Class 2.mp4', 
        4.9, 
        1500000, 
        GETDATE(), 
        GETDATE()
    ),
    (
        10, 
        'Wonder Woman', 
        'movie', 
        'When a pilot crashes and tells of conflict in the outside world, Diana, an Amazonian warrior in training, leaves home to fight a war, discovering her full powers and true destiny.', 
        'Action, Adventure, Fantasy', 
        '2017-06-02', 
        141, 
        1, 
        'thumbnail/Wonder Woman.jpg', 
        'videos/WONDER WOMAN.mp4', 
        'videos/WONDER WOMAN.mp4', 
        4.3, 
        2300000, 
        GETDATE(), 
        GETDATE()
    ),
    -- Let's add two upcoming movies with StreamUrl as NULL to populate the "Upcoming Movies" section of the app
    (
        11,
        'Spider-Man: Beyond the Spider-Verse',
        'movie',
        'The epic final conclusion to Miles Morales'' multi-dimensional journey across the Spider-Verse.',
        'Animation, Action, Sci-Fi',
        '2027-05-01',
        130,
        0,
        'thumbnail/SpiderMan.jpg',
        NULL,
        NULL,
        0.0,
        0,
        GETDATE(),
        GETDATE()
    ),
    (
        12,
        'Dune: Messiah',
        'movie',
        'The continuing saga of Paul Atreides as he rules his empire and faces the consequences of his messianic rise.',
        'Sci-Fi, Drama',
        '2028-12-18',
        150,
        0,
        'thumbnail/Dune.jpg',
        NULL,
        NULL,
        0.0,
        0,
        GETDATE(),
        GETDATE()
    );

    SET IDENTITY_INSERT [MediaItems] OFF;

    ---------------------------------------------------------
    -- 4. Seed [Users] Table
    ---------------------------------------------------------
    SET IDENTITY_INSERT [Users] ON;

    -- Standard plain-text password hashing as expected by login endpoint
    INSERT INTO [Users] (
        [UserId], [FullName], [Email], [PasswordHash], [Role], [IsActive], [CreatedAt], [UpdatedAt]
    ) VALUES
    (1, 'Admin CineLux', 'admin@cinelux.com', 'admin12345', 'admin', 1, GETDATE(), GETDATE()),
    (2, 'Haydar LP', 'haydar@cinelux.com', 'viewer12345', 'viewer', 1, GETDATE(), GETDATE()),
    (3, 'John Doe', 'john@example.com', 'john12345', 'viewer', 1, GETDATE(), GETDATE());

    SET IDENTITY_INSERT [Users] OFF;

    ---------------------------------------------------------
    -- 5. Seed [UserSubscriptions] Table
    ---------------------------------------------------------
    SET IDENTITY_INSERT [UserSubscriptions] ON;

    -- Active subscription for Haydar to Standard Monthly (Plan 2)
    -- Expired subscription for John Doe to Premium Monthly (Plan 3)
    INSERT INTO [UserSubscriptions] (
        [SubscriptionId], [UserId], [PlanId], [Status], 
        [StartDate], [CurrentPeriodStart], [CurrentPeriodEnd], 
        [CanceledAt], [CreatedAt]
    ) VALUES
    (
        1, 
        2, 
        2, 
        'active', 
        CAST(DATEADD(month, -1, GETDATE()) AS Date), 
        CAST(GETDATE() AS Date), 
        CAST(DATEADD(month, 1, GETDATE()) AS Date), 
        NULL, 
        DATEADD(month, -1, GETDATE())
    ),
    (
        2, 
        3, 
        3, 
        'expired', 
        CAST(DATEADD(month, -2, GETDATE()) AS Date), 
        CAST(DATEADD(month, -2, GETDATE()) AS Date), 
        CAST(DATEADD(month, -1, GETDATE()) AS Date), 
        NULL, 
        DATEADD(month, -2, GETDATE())
    );

    SET IDENTITY_INSERT [UserSubscriptions] OFF;

    ---------------------------------------------------------
    -- 6. Seed [Payments] Table
    ---------------------------------------------------------
    SET IDENTITY_INSERT [Payments] ON;

    -- Payments matching active subscription for Haydar and old subscription for John Doe
    INSERT INTO [Payments] (
        [PaymentId], [SubscriptionId], [UserId], [Amount], [CurrencyCode], 
        [PaymentMethod], [PaymentStatus], [PaidAt], [CreatedAt]
    ) VALUES
    (
        1, 
        1, 
        2, 
        12.99, 
        'USD', 
        'card', 
        'succeeded', 
        DATEADD(month, -1, GETDATE()), 
        DATEADD(month, -1, GETDATE())
    ),
    (
        2, 
        1, 
        2, 
        12.99, 
        'USD', 
        'card', 
        'succeeded', 
        GETDATE(), 
        GETDATE()
    ),
    (
        3, 
        2, 
        3, 
        17.99, 
        'USD', 
        'card', 
        'succeeded', 
        DATEADD(month, -2, GETDATE()), 
        DATEADD(month, -2, GETDATE())
    );

    SET IDENTITY_INSERT [Payments] OFF;

    COMMIT TRANSACTION;
    PRINT 'Seed data inserted successfully.';
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    PRINT 'Error occurred during seeding. Transaction rolled back.';
    THROW;
END CATCH;
